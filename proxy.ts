import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  let isSessionActive = false;

  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      let response;
      try {
        response = await checkSession();
      } catch (error) {
        console.error(error);
        response = null;
      }

      isSessionActive = !!(response && response.data && response.data.success);
      const setCookie = response?.headers?.['set-cookie'];
      const updatedCookieNames = new Set<string>();
      
      if (isSessionActive && setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);
            
          if (parsed && typeof parsed.value === 'string') {

            const { name, value, sameSite, ...restOptions } = parsed;

            let validSameSite: 'lax' | 'strict' | 'none' | undefined = undefined;
            if (typeof sameSite === 'string') {
              const lower = sameSite.toLowerCase();

              if (lower === 'lax' || lower === 'strict' || lower === 'none') {
                validSameSite = lower;
              }
            } else if (sameSite === true) {
              validSameSite = 'strict';
            }

            const options = {
              ...restOptions,
              ...(validSameSite ? { sameSite: validSameSite } : {})
            };
            cookieStore.set(name, value, options);
            updatedCookieNames.add(parsed.name);
          }
        }
          
        //const isSessionActive = response.data.success;
        
        if (updatedCookieNames.has('accessToken') && !updatedCookieNames.has('refreshToken')) {
          cookieStore.delete('refreshToken');
        }
        if (updatedCookieNames.has('refreshToken') && !updatedCookieNames.has('accessToken')) {
          cookieStore.delete('accessToken');
        }
      } else if (!isSessionActive) {
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
      }
      // Якщо сесія все ще активна:
      if (isSessionActive) {
        // для публічного маршруту — виконуємо редірект на головну.
        if (isPublicRoute) {
          const responseRedirect = NextResponse.redirect(new URL('/', request.url));
          //cookieStore -> заголовки відповіді для браузера
          applyCookieStoreToResponse(cookieStore, responseRedirect);
          return responseRedirect;
           
        }
        if (isPrivateRoute) {
          const responseNext = NextResponse.next();
          applyCookieStoreToResponse(cookieStore, responseNext);
          return responseNext;
        }
      }
    }

    // if refreshToken or not session

    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

// Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

// для приватного маршруту — дозволяємо доступ
        if (isPrivateRoute) {
          return NextResponse.next();
        }
      }
function applyCookieStoreToResponse(cookieStore: any, response: NextResponse) {
  
  for (const cookie of cookieStore.getAll()) {
    response.cookies.set(cookie.name, cookie.value, cookie);
  }
} 
  

export const config = {
  matcher: ['/profile/:path*','/notes/:path*' ,'/sign-in', '/sign-up'],
};
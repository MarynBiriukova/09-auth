// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { checkSession } from './lib/api/serverApi';
import axios  from 'axios';//,{AxiosError}

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      try {
        const data = await checkSession();
        const setCookie = data.headers['set-cookie'];

        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);

            
            if (parsed.value && parsed.name) {
                 
              const cOptions = {
                path: parsed.path || '/',
                httpOnly: parsed.httpOnly,
                secure: parsed.secure,
                sameSite: parsed.sameSite as "lax" | "strict" | "none" | undefined,
                expires: parsed.expires,
                maxAge: parsed.maxAge

              };
              //cookieStore.set(parsed.name, parsed.value, cOptions);
              response.cookies.set(parsed.name, parsed.value, cOptions);
            }
          }

          response.headers.set('x-middleware-request-cookie', response.cookies.toString());
        }
        return response;
      } catch (error) {
        console.error('Session check failed:', axios.isAxiosError(error) ? error.response?.status : error);
        // Якщо сесія недійсна, на приватному маршруті відправляємо на вхід
        const fallbackResponse = isPrivateRoute
          ? NextResponse.redirect(new URL('/sign-in', request.url))
          : NextResponse.next();
        
        fallbackResponse.cookies.set('accessToken', '', { maxAge: 0 , path: '/'});
        fallbackResponse.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
        
        return fallbackResponse;
      }
      
    }
    // Якщо refreshToken або сесії немає:
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
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*','/notes/:path*' ,'/sign-in', '/sign-up'],
};

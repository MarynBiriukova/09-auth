import axios from 'axios';
import { cookies } from 'next/headers';



const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' + '/api';

export const nextServer = axios.create({
   baseURL: baseURL,
});
 
nextServer.interceptors.request.use(async (config) => {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    if (allCookies) {
      config.headers.Cookie = allCookies;
    }
  } catch (e) {
    console.warn(`nextServer used outside of server environment ${e}`);
  }

  return config;
});


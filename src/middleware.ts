/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest, res: NextResponse) {
  const response = NextResponse.next();
  const isAuth = req.cookies.has('token');
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const validatedAccessToken = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth-verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    const data = await res.json();
    return data;
  };

  const redirect = (newUrl: string) => {
    return NextResponse.redirect(new URL(newUrl, req.url));
  };

  const pathnameVerify = (path: string) => {
    return pathname.startsWith(path);
  };

  if (isAuth && token) {
    const data = await validatedAccessToken(token);
    const isValidToken = data.isValidToken as boolean;
    if (!isValidToken && pathname !== '/login') {
      const newResponse = redirect('/login');
      newResponse.cookies.delete('token');
      return newResponse;
    }
  }

  // yes auth
  if (
    isAuth &&
    (pathname === '/' ||
      pathnameVerify('/about-us') ||
      pathnameVerify('/create-account') ||
      pathnameVerify('/login') ||
      pathnameVerify('/recover-password') ||
      pathnameVerify('/products') ||
      pathnameVerify('/products/:path'))
  ) {
    return redirect('/home');
  }

  // no auth
  if (
    !isAuth &&
    (pathnameVerify('/home') ||
      pathnameVerify('/wallet') ||
      pathnameVerify('/wallet/:path*') ||
      pathnameVerify('/negotiate') ||
      pathnameVerify('/historic') ||
      pathnameVerify('/content') ||
      pathnameVerify('/settings'))
  ) {
    return redirect('/login');
  }

  return response;
}

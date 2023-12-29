/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest, res: NextResponse) {
  const response = NextResponse.next();
  const isAuth = req.cookies.has('token');
  const { pathname } = req.nextUrl;
  if (isAuth && pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (isAuth && pathname.startsWith('/about-us')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (isAuth && pathname.startsWith('/create-account')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (isAuth && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (isAuth && pathname.startsWith('/recover-password')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (isAuth && pathname.startsWith('/products')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (!isAuth && pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return response;
}

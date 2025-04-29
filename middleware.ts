import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/cart'];
const authPages = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isPrivatePath = privatePaths.some((path) =>
    pathname === path || pathname.startsWith(path + '/')
  );

  const isAuthPage = authPages.includes(pathname);

  // Redirect unauthenticated user trying to access private page
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated user away from login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

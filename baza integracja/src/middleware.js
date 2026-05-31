import { NextResponse } from 'next/server'

export function middleware(req) {
  const sessionToken = req.cookies.get('session_token')?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
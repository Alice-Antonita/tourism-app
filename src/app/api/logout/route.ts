import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.headers.set('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict');
  return response;
}

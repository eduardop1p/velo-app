import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookie = cookies();
  cookie.delete('token');

  return NextResponse.json({ success: 'user logout' });
}

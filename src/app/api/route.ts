import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

// eslint-disable-next-line
export async function GET(request: Request) {
  return NextResponse.json(
    { status: 200 },
    {
      status: 200,
      headers: {
        // subtstituir * pela origin certa do domain
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export function NextResponseSuccess({
  body,
  status,
}: {
  body: {
    msg: string;
    type: string;
    refreshToken?: string;
    isValidToken?: boolean;
  };
  status: number;
}) {
  return NextResponse.json(
    {
      success: body.msg,
      type: body.type,
      refreshToken: body.refreshToken,
      isValidToken: body.isValidToken,
    },
    { status }
  );
}

export function NextResponseError({
  body,
  status,
}: {
  body: {
    msg: string;
    type: string;
    refreshToken?: string;
    isValidToken?: boolean;
  };
  status: number;
}) {
  return NextResponse.json(
    {
      error: body.msg,
      type: body.type,
      refreshToken: body.refreshToken,
      isValidToken: body.isValidToken,
    },
    { status: status }
  );
}

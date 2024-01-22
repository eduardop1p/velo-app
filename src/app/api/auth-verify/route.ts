import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import dbConnect from '@/lib/dbConnect';
import { NextResponseError, NextResponseSuccess } from '../route';

// eslint-disable-next-line
export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return NextResponseError({
      body: {
        msg: 'You need to login',
        type: 'server',
        isValidToken: false,
      },
      status: 401,
    });
  }

  try {
    const [, token] = authorization.split(' ');
    const secret = process.env.TOKEN_SECRET as string;
    jwt.verify(token, secret);

    return NextResponseSuccess({
      body: {
        msg: 'Validated access token',
        type: 'server',
        isValidToken: true,
        refreshToken: '',
      },
      status: 200,
    });
  } catch (err) {
    // console.log(err);
    return NextResponseError({
      body: {
        msg: 'Invalid access token',
        type: 'server',
        isValidToken: false,
      },
      status: 401,
    });
  }
}

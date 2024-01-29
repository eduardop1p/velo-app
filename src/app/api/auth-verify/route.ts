/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import BaseRoute from '../route';

// eslint-disable-next-line
export async function GET(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get('authorization');
  const authVerify = new AuthVerify(authorization);
  try {
    const errors = authVerify.errors;

    authVerify.verifyAuthorization();
    if (errors.length) {
      return authVerify.responseError(errors[0]);
    }
    authVerify.verifyToken();
    if (errors.length) {
      return authVerify.responseError(errors[0]);
    }
    return authVerify.responseSuccess({
      body: {
        msg: 'Validated access token',
        type: 'server',
        isValidToken: true,
        refreshToken: '',
      },
      status: 200,
    });
  } catch {
    return authVerify.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
        isValidToken: false,
      },
      status: 500,
    });
  }
}

class AuthVerify extends BaseRoute {
  constructor(protected authorization: string | null) {
    super(authorization);
  }

  verifyToken() {
    try {
      if (!this.authorization) return;
      const [, token] = this.authorization.split(' ');
      const secret = process.env.TOKEN_SECRET as string;
      jwt.verify(token, secret);
    } catch {
      this.errors.push({
        body: {
          msg: 'Invalid access token',
          type: 'server',
          isValidToken: false,
        },
        status: 401,
      });
      return;
    }
  }
}

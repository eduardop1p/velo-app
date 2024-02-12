import { NextRequest, NextResponse } from 'next/server';
import BaseRoute from '../../baseRoute';

// eslint-disable-next-line
export async function GET(req: NextRequest, ) {
  const authorization = req.headers.get('authorization');
  const config = new Config(authorization);
  const errors = config.errors;

  try {
    config.verifyAuthorization();
    if (errors.length) {
      return config.responseError(errors[0]);
    }
    return NextResponse.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch {
    return config.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class Config extends BaseRoute {
  constructor(protected readonly authorization?: string | null) {
    super(authorization);
  }
}

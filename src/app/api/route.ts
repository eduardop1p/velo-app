import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

import dbConnect from '@/lib/dbConnect';

export interface BodyResponseType {
  body: {
    msg: string;
    type: string;
    refreshToken?: string;
    isValidToken?: boolean;
  };
  status: number;
}

// eslint-disable-next-line
export async function GET(request: Request) {
  return NextResponse.json(
    { status: 200 },
    {
      status: 200,
      headers: {
        // subtstituir * pela origin certa do domain
        'Access-Control-Allow-Origin': process.env.ORIGIN!,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export class BaseRoute {
  public errors: BodyResponseType[] = [];

  constructor(protected readonly authorization?: string | null) {}

  async connectDb() {
    try {
      await dbConnect();
    } catch (err) {
      this.errorInServer();
    }
  }

  verifyAuthorization() {
    if (!this.authorization) {
      this.errors.push({
        body: {
          msg: 'You need to login',
          type: 'server',
          isValidToken: false,
        },
        status: 401,
      });
      return;
    }
  }

  protected isEmail(value: string) {
    const regex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(value);
  }

  protected isEmpety(value: string) {
    return !value;
  }

  protected errorRequiredField(type: string) {
    this.errors.push({
      body: {
        msg: 'Required field',
        type,
      },
      status: 400,
    });
  }

  protected errorInEmail() {
    this.errors.push({
      body: {
        msg: 'Invalid email',
        type: 'email',
      },
      status: 400,
    });
  }

  protected errorInServer() {
    this.errors.push({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }

  responseError({ body, status }: BodyResponseType) {
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

  responseSuccess({ body, status }: BodyResponseType) {
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
}

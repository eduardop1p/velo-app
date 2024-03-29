import dbConnect from '@/lib/dbConnect';
import { cryptosNames } from '@/services/formatDataCrypto';
import { NextResponse } from 'next/server';

export interface BodyResponseType {
  body: {
    msg: string;
    type: string;
    refreshToken?: string;
    isValidToken?: boolean;
  };
  status: number;
}

export type SymbolType = (typeof cryptosNames)[number]['symbol'] | null;

export default class BaseRoute {
  public errors: BodyResponseType[] = [];

  constructor(
    protected readonly authorization?: string | null,
    protected readonly symbol?: SymbolType
  ) {}

  async connectDb() {
    try {
      await dbConnect();
    } catch (err) {
      // console.log(err);
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

  verifySymbol() {
    if (
      !this.symbol ||
      !cryptosNames.map(val => val.symbol).includes(this.symbol)
    ) {
      this.errors.push({
        body: {
          msg: 'Symbol not found',
          type: 'server',
        },
        status: 400,
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

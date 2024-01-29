import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { type Document, Types } from 'mongoose';

import usersModel, { UserDocumentType } from '../models/users';
import BaseRoute from '../baseRoute';

interface LoginType {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: LoginType = await req.json();

  const login = new Login(body);
  const errors = login.errors;

  try {
    await login.connectDb();
    if (errors.length) {
      return login.responseError(errors[0]);
    }
    login.verifyBody();
    if (errors.length) {
      return login.responseError(errors[0]);
    }
    await login.userExistToEmail();
    if (errors.length) {
      return login.responseError(errors[0]);
    }
    await login.userExist();
    if (errors.length) {
      return login.responseError(errors[0]);
    }
    const { userToken, userName } = login.createToken();

    const cookie = cookies();

    cookie.set('token', userToken, {
      httpOnly: true,
      path: '/',
      maxAge: 2592000000, // esse cookie vai expirar em 1 mês
      secure: true,
      sameSite: 'none',
      priority: 'high',
      // domain: 'pornonly.xyz',
      // maxAge: new Date(Date.now() + 864000000)
    });

    return NextResponse.json({ userToken, userName });
  } catch {
    return login.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class Login extends BaseRoute {
  private user:
    | (Document<unknown, {}, UserDocumentType> & // eslint-disable-line
        UserDocumentType & {
          _id: Types.ObjectId;
        })
    | null = null;

  constructor(private readonly body: LoginType) {
    super();
  }

  verifyBody() {
    if (this.isEmpety(this.body.email)) {
      this.errorRequiredField('email');
      return;
    }
    if (!this.isEmail(this.body.email)) {
      this.errorInEmail();
      return;
    }
    if (this.isEmpety(this.body.password)) {
      this.errorRequiredField('password');
      return;
    }
  }

  async userExistToEmail() {
    try {
      const { email } = this.body;
      this.user = await usersModel.findOne({ email });
      if (!this.user) {
        this.errors.push({
          body: {
            msg: 'The email entered does not belong to any account',
            type: 'email',
          },
          status: 400,
        });
      }
    } catch {
      this.errorInServer();
    }
  }

  async userExist() {
    try {
      this.user = await usersModel.findOne(this.body);
      if (!this.user) {
        this.errors.push({
          body: {
            msg: 'The password you entered is not correct. Try again or change your password',
            type: 'password',
          },
          status: 401,
        });
      }
    } catch {
      this.errorInServer();
    }
  }

  createToken() {
    if (!this.user) return { userToken: '', userName: '' };

    const { _id, email, name } = this.user;
    const token = jwt.sign(
      { id: _id.toString(), email },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    return { userToken: token, userName: name };
  }
}

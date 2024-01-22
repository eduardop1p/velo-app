import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import usersModel from '../models/users';
import dbConnect from '@/lib/dbConnect';

import { NextResponseError } from '../route';

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = (await req.json()) as { email: string; password: string };
  if (!body)
    return NextResponseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });

  try {
    const userExist = await usersModel.findOne({ email: body.email });
    if (!userExist) {
      return NextResponseError({
        body: {
          msg: 'The email entered does not belong to any account',
          type: 'email',
        },
        status: 400,
      });
    }
    const user = await usersModel.findOne(body);
    if (!user) {
      return NextResponseError({
        body: {
          msg: 'The password you entered is not correct. Try again or change your password',
          type: 'password',
        },
        status: 401,
      });
    }
    const { _id, email, name } = user;
    const token = jwt.sign(
      { id: _id.toString(), email },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    const cookie = cookies();

    cookie.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 2592000000, // esse cookie vai expirar em 1 mês
      secure: true,
      sameSite: 'none',
      priority: 'high',
      // domain: 'pornonly.xyz',
      // maxAge: new Date(Date.now() + 864000000)
    });

    return NextResponse.json({ token, name });
  } catch (err) {
    // console.log(err);
    return NextResponseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

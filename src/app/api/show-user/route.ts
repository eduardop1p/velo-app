import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import dbConnect from '@/lib/dbConnect';
import usersModel, { UserType } from '../models/users';

// eslint-disable-next-line
export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return NextResponse.json(
      {
        type: 'server',
        error: 'You need to login',
      },
      {
        status: 401,
      }
    );
  }
  const [, token] = authorization.split(' ');
  const data = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as jwt.JwtPayload & { id: string; email: string };

  try {
    const user = (await usersModel.findById(data.id)) as UserType;
    return NextResponse.json({
      name: user.name,
      email: user.email,
      dateBirth: user.dateBirth,
      cellPhone: user.cellPhone,
      country: user.country,
    });
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      {
        error: 'Internal server error',
        type: 'server',
      },
      { status: 500 }
    );
  }
}

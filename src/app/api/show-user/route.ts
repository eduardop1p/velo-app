import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import dbConnect from '@/lib/dbConnect';
import usersModel, { UserType } from '../models/users';
import { NextResponseError } from '../route';

// eslint-disable-next-line
export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return NextResponseError({
      body: {
        msg: 'You need to login',
        type: 'server',
      },
      status: 401,
    });
  }

  try {
    const [, token] = authorization.split(' ');
    const authData = jwt.decode(token) as { id: string };

    const user = (await usersModel.findById(authData.id)) as UserType;
    if (!user) {
      return NextResponseError({
        body: {
          msg: 'User not found',
          type: 'server',
        },
        status: 400,
      });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      dateBirth: user.dateBirth,
      cellPhone: user.cellPhone,
      country: user.country,
      active: user.active,
      veliabilities: user.veliabilities,
      transactions: user.transactions,
      cryptos: user.cryptos,
    });
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

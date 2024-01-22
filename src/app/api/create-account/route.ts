import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import usersModel, { UserType } from '../models/users';

import { NextResponseError } from '../route';

// eslint-disable-next-line
export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = (await req.json()) as UserType;

  if (!body)
    return NextResponseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });

  try {
    const { email } = body;
    const useExist = await usersModel.findOne({ email });
    if (useExist) {
      return NextResponseError({
        body: {
          msg: 'There is already a user with this email',
          type: 'email',
        },
        status: 400,
      });
    }
    const defaultMoney = {
      active: [],
      veliabilities: [],
      transactions: [],
    };
    await usersModel.create({ ...body, ...defaultMoney });
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

  return NextResponse.json({ success: 'Account created' });
}

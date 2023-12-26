import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import usersModel, { UserType } from '../models/users';

// eslint-disable-next-line
export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = (await req.json()) as UserType;
  const { email } = body;

  if (!body)
    return NextResponse.json(
      {
        error: 'Internal server error',
        type: 'server',
      },
      { status: 500 }
    );

  try {
    const useExist = await usersModel.findOne({ email });
    if (useExist) {
      return NextResponse.json(
        {
          error: 'There is already a user with this email',
          type: 'email',
        },
        { status: 400 }
      );
    }

    await usersModel.create(body);
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

  return NextResponse.json({ success: 'Account created' });
}

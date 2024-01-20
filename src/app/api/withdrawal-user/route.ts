import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import dbConnect from '@/lib/dbConnect';
import usersModel from '../models/users';

interface BodyType {
  amountWithdrawalCrypto: number;
  amountWithdrawalDollar: number;
  amountSendCryptoKucoin: number;
  walletAddress: string;
  userCryptoBalance: number;
  cryptoName: string;
}

// eslint-disable-next-line
export async function POST(req: NextRequest, res: NextResponse) {
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

  const body = (await req.json()) as BodyType;
  if (!body)
    return NextResponse.json(
      {
        error: 'Internal server error',
        type: 'server',
      },
      { status: 500 }
    );

  try {
    const [, token] = authorization.split(' ');
    const authData = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as jwt.JwtPayload & { id: string; email: string };

    const {
      amountWithdrawalCrypto,
      amountWithdrawalDollar,
      userCryptoBalance,
      amountSendCryptoKucoin, // eslint-disable-line
      walletAddress, // eslint-disable-line
      cryptoName,
    } = body;
    if (amountWithdrawalCrypto > userCryptoBalance) {
      return NextResponse.json(
        {
          error: 'Insufficient funds',
          type: 'server',
        },
        { status: 403 }
      );
    }

    let user = await usersModel
      .findById(authData.id)
      .select(['transactions', 'cryptos']);
    if (!user) {
      return NextResponse.json(
        {
          error: 'User not found',
          type: 'server',
        },
        { status: 400 }
      );
    }
    // const isCryptoName = user.cryptos.every(val => val.name === cryptoName);

    user.transactions.push({
      title: `${cryptoName} withdrawal`,
      date: Date.now() * 1000,
      status: 'pending',
      value: -amountWithdrawalDollar,
    });
    const cryptos = user.cryptos.map(val => {
      if (val.name === cryptoName) {
        val.value -= amountWithdrawalCrypto;
      }
      return val;
    });
    user.cryptos = cryptos;
    await user.save();

    // fetch kucoin aqui

    return NextResponse.json(
      {
        success: 'Cryptos sent to the given address',
        type: 'server',
      },
      { status: 200 }
    );
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

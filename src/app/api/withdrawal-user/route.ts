import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import dbConnect from '@/lib/dbConnect';
import usersModel from '../models/users';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import { NextResponseSuccess, NextResponseError } from '../route';

interface BodyType {
  amountWithdrawalCrypto: number;
  amountWithdrawalDollar: number;
  amountSendCryptoKucoin: number;
  walletAddress: string;
  cryptoName: string;
  cryptoSymbol: string;
}

// eslint-disable-next-line
export async function POST(req: NextRequest, res: NextResponse) {
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

  const body = (await req.json()) as BodyType;
  if (!body)
    return NextResponseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  const {
    amountWithdrawalCrypto,
    amountWithdrawalDollar,
    amountSendCryptoKucoin,
    walletAddress,
    cryptoSymbol,
    cryptoName,
  } = body;

  try {
    const [, token] = authorization.split(' ');
    const authData = jwt.decode(token) as { id: string };

    let user = await usersModel
      .findById(authData.id)
      .select(['transactions', 'cryptos']);
    if (!user) {
      return NextResponseError({
        body: {
          msg: 'User not found',
          type: 'server',
        },
        status: 400,
      });
    }
    const findUserCryptoBalance = user.cryptos.find(
      val => val.name === cryptoName
    );
    const userCryptoBalance = findUserCryptoBalance
      ? findUserCryptoBalance.value
      : 0;
    if (amountWithdrawalCrypto > userCryptoBalance) {
      return NextResponseError({
        body: {
          msg: 'Insufficient funds',
          type: 'server',
        },
        status: 403,
      });
    }
    // const isCryptoName = user.cryptos.every(val => val.name === cryptoName);

    // fetch kucoin aqui
    const { dataKucoin, errKucoin } = await fetchKucoinApi({
      apiEndpoint: '/api/v1/withdrawals',
      apiMethod: 'POST',
      body: {
        currency: cryptoSymbol,
        address: walletAddress,
        amount: amountSendCryptoKucoin,
      },
      apiQueryString: '',
    });
    // const withdrawalId = dataSendCrypto.withdrawalId;

    // user.transactions.push({
    //   title: `${cryptoName} withdrawal`,
    //   date: Date.now() * 1000,
    //   status: 'pending',
    //   value: -amountWithdrawalDollar,
    //   cryptoValue: -amountWithdrawalCrypto,
    //   withdrawalId,
    // });
    // const cryptos = user.cryptos.map(val => {
    //   if (val.name === cryptoName) {
    //     val.value -= amountWithdrawalCrypto;
    //   }
    //   return val;
    // });
    // user.cryptos = cryptos;
    // await user.save();

    return NextResponseSuccess({
      body: {
        msg: 'Cryptos sent to the given address',
        type: 'server',
      },
      status: 200,
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

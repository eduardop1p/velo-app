/* eslint-disable @typescript-eslint/no-unused-vars */
import { payments, Psbt } from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { upperFirst } from 'lodash';

import BaseRoute from '../baseRoute';
import usersModel from '../models/users';
import { cryptosNames } from '@/services/formatDataCrypto';
import btcToSatoshis from '@/services/btcToSatoshis';

interface BodyType {
  type: 'money' | 'crypto';
  method: 'deposit' | 'send';
  symbol: string;
  cryptoValue?: number;
  dollarValue?: number;
  amountReceived?: number; // apenas para depositos em moedas ficundiarias
  userId: string;
  address?: string;
  privateKey?: string;
  paymentIntent?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get('authorization');
  const body: BodyType = await req.json();
  const { type, method, symbol } = body;

  const transactionsWallets = new TransactionsWallets(authorization, body);
  const errors = transactionsWallets.errors;
  try {
    transactionsWallets.verifyAuthorization();
    if (errors.length) {
      return transactionsWallets.responseError(errors[0]);
    }
    transactionsWallets.verifyBody();
    if (errors.length) {
      return transactionsWallets.responseError(errors[0]);
    }
    await transactionsWallets.connectDb();
    if (errors.length) {
      return transactionsWallets.responseError(errors[0]);
    }

    if (type === 'crypto' && method === 'send' && symbol !== 'USD') {
      await transactionsWallets.createTransactionSendCrypto();
      if (errors.length) {
        return transactionsWallets.responseError(errors[0]);
      }
      return transactionsWallets.responseSuccess({
        body: {
          msg: 'Cryptos sent to the specified destination address',
          type: 'server',
        },
        status: 200,
      });
    }

    if (type === 'money' && method === 'deposit') {
      await transactionsWallets.createTransactionDeposit();
      if (errors.length) {
        return transactionsWallets.responseError(errors[0]);
      }
      return transactionsWallets.responseSuccess({
        body: {
          msg: 'Your deposit has been processed',
          type: 'server',
        },
        status: 200,
      });
    }

    return NextResponse.json({
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return transactionsWallets.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class TransactionsWallets extends BaseRoute {
  constructor(
    protected readonly authorization: string | null,
    protected readonly body: BodyType
  ) {
    super(authorization);
  }

  verifyBody() {
    const { symbol, dollarValue, type, method } = this.body;
    if (!symbol || !dollarValue || !type || !method) {
      this.errors.push({
        body: {
          msg: 'Incomplete request body',
          type: 'server',
        },
        status: 400,
      });
      return;
    }
    if (type !== 'crypto' && type !== 'money') {
      this.errorInbody('Type not allowed');
      return;
    }
    if (method !== 'deposit' && method !== 'send') {
      this.errorInbody('Method not allowed');
      return;
    }
  }

  errorInbody(msg: string) {
    this.errors.push({
      body: {
        msg,
        type: 'server',
      },
      status: 400,
    });
  }

  async createTransactionDeposit() {
    try {
      let {
        dollarValue,
        type,
        symbol,
        method,
        paymentIntent,
        userId,
        amountReceived,
      } = this.body;

      const [, token] = this.authorization!.split(' ');
      const authData = jwt.decode(token) as { id: string };

      const user = await usersModel.findById(authData.id);
      if (!user) return;

      if (user.transactions.length && user.transactions.map(val => val.paymentIntent).includes(paymentIntent)) return; // eslint-disable-line
      if (userId !== user._id.toString()) return;
      if (!amountReceived) return;

      switch (symbol) {
        case 'JPY': {
          break;
        }
        case 'JOD': {
          amountReceived /= 1000;
          break;
        }
        case 'KWD': {
          amountReceived /= 1000;
          break;
        }
        case 'LAK': {
          break;
        }
        case 'KRW': {
          break;
        }
        case 'VND': {
          break;
        }
        default:
          amountReceived /= 100;
          break;
      }

      user.transactions.push({
        cryptoValue: 0,
        date: Date.now(),
        dollarValue: dollarValue! / 100,
        amountReceived,
        status: 'success',
        title: upperFirst(method),
        symbol,
        type,
        paymentIntent,
      });
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }

  async createTransactionSendCrypto() {
    const { symbol, address, cryptoValue, privateKey } = this.body;
    if (!address || !privateKey) return;
    switch (symbol) {
      case 'BTC': {
        try {
          // descontar o saldo nas transções do usuário aqui

          const psbt = new Psbt();
          psbt.addOutput({
            address,
            value: btcToSatoshis(cryptoValue!), // valor em satoshis
          });
          const ECPair = ECPairFactory(ecc);
          const userWif = ECPair.fromWIF(privateKey);
          psbt.signAllInputs(userWif);
          psbt.finalizeAllInputs();
          const transaction = psbt.extractTransaction();
          const toRex = transaction.toHex();
        } catch (err) {
          // console.log(err);
          this.errors.push({
            body: {
              msg: `Error when sending ${symbol}`,
              type: 'server',
            },
            status: 400,
          });
        }
        break;
      }
    }
  }
}

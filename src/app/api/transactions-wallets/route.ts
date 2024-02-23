/* eslint-disable @typescript-eslint/no-unused-vars */
import { payments, Psbt } from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { upperFirst } from 'lodash';

import BaseRoute from '../baseRoute';
import usersModel, { TransactionsType } from '../models/users';
import { cryptosNames } from '@/services/formatDataCrypto';
import btcToSatoshis from '@/services/btcToSatoshis';
import calBalance from '@/services/calcBalance';

interface BodyType {
  type: 'money' | 'crypto';
  method: 'deposit' | 'withdraw';
  symbol: string;
  cryptoValue?: number;
  dollarValue?: number;
  amountReceived?: number; // apenas para depositos em moedas ficundiarias
  userId: string;
  address?: string;
  privateKey?: string;
  paymentIntent?: string;
  metadataDestination?: Record<string, string>;
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

    if (type === 'crypto' && method === 'withdraw' && symbol !== 'USD') {
      await transactionsWallets.createTransactionWithdrawCrypto();
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
    if (type === 'money' && method === 'withdraw' && symbol === 'USD') {
      const transactionId =
        await transactionsWallets.createTransactionWithdrawFunds();
      if (errors.length) {
        return transactionsWallets.responseError(errors[0]);
      }

      return NextResponse.json({
        transactionId,
        success: 'Funds sent to the specified destination address',
        type: 'server',
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
    if (method !== 'deposit' && method !== 'withdraw') {
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

  async createTransactionWithdrawCrypto() {
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

  async createTransactionWithdrawFunds() {
    const { method, symbol, type, dollarValue, metadataDestination } =
      this.body;
    const [, token] = this.authorization!.split(' ');
    const authData = jwt.decode(token) as { id: string };

    try {
      const user = await usersModel.findById(authData.id);
      if (!user) return;
      if (dollarValue! > calBalance(user.transactions)) {
        this.errors.push({
          body: {
            msg: 'Insufficient funds',
            type: 'server',
          },
          status: 400,
        });
        return;
      }

      user.transactions.push({
        date: Date.now(),
        status: 'pending',
        symbol,
        title: upperFirst(method),
        type,
        dollarValue: -dollarValue!,
        cryptoValue: 0,
        metadataDestination,
      });
      await user.save();
      const transaction = user.transactions[
        user.transactions.length - 1
      ] as TransactionsType & { _id: string };

      return transaction._id;
    } catch {
      this.errorInServer();
    }
  }
}

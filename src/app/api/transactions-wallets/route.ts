/* eslint-disable @typescript-eslint/no-unused-vars */
import { payments, Psbt } from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import BaseRoute, { SymbolType } from '../baseRoute';
import usersModel from '../models/users';
import { cryptosNames } from '@/services/formatDataCrypto';
import btcToSatoshis from '@/services/btcToSatoshis';

interface BodyType {
  symbol: SymbolType;
  address: string;
  value: number;
  privateKey: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get('authorization');
  const body: BodyType = await req.json();

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
    await transactionsWallets.createTransaction();
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
    const { symbol, address, value, privateKey } = this.body;
    if (!symbol || !address || !privateKey || !value) {
      this.errors.push({
        body: {
          msg: 'Incomplete request body',
          type: 'server',
        },
        status: 400,
      });
      return;
    }
    if (!cryptosNames.map(val => val.symbol).includes(symbol)) {
      this.errors.push({
        body: {
          msg: 'symbol not found',
          type: 'server',
        },
        status: 400,
      });
      return;
    }
  }

  async createTransaction() {
    const { symbol, address, value, privateKey } = this.body;
    switch (symbol) {
      case 'BTC': {
        try {
          // descontar o saldo nas transções do usuário aqui

          const psbt = new Psbt();
          psbt.addOutput({
            address,
            value: btcToSatoshis(value), // valor em satoshis
          });
          const ECPair = ECPairFactory(ecc);
          const userWif = ECPair.fromWIF(privateKey);
          psbt.signAllInputs(userWif);
          psbt.finalizeAllInputs();
          const transaction = psbt.extractTransaction();
          const toRex = transaction.toHex();
        } catch (err) {
          console.log(err);
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

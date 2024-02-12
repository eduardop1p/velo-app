/* eslint-disable @typescript-eslint/no-unused-vars */
import { payments } from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import BaseRoute, { SymbolType } from '../baseRoute';
import usersModel from '../models/users';

interface BodyType {
  symbol: SymbolType;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get('authorization');
  const body: BodyType = await req.json();
  const { symbol } = body;

  const createWallets = new CreateWallets(authorization, symbol);
  const errors = createWallets.errors;
  try {
    createWallets.verifyAuthorization();
    if (errors.length) {
      return createWallets.responseError(errors[0]);
    }
    createWallets.verifySymbol();
    if (errors.length) {
      return createWallets.responseError(errors[0]);
    }
    await createWallets.connectDb();
    if (errors.length) {
      return createWallets.responseError(errors[0]);
    }
    const wallet = await createWallets.userSetWallet();
    if (errors.length) {
      return createWallets.responseError(errors[0]);
    }

    return NextResponse.json(wallet);
  } catch (err) {
    console.log(err);
    return createWallets.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class CreateWallets extends BaseRoute {
  constructor(
    protected readonly authorization: string | null,
    protected readonly symbol: SymbolType
  ) {
    super(authorization, symbol);
  }

  async createWallets() {
    /*
      // pegar dados do endereço btc
      const result = await dhttp({
        method: 'GET',
        url: 'https://blockchain.info/rawaddr/' + address,
      });
    */

    switch (this.symbol) {
      case 'BTC': {
        try {
          const ECPair = ECPairFactory(ecc);
          const keyPair = ECPair.makeRandom();
          const { address } = payments.p2pkh({
            pubkey: keyPair.publicKey,
          });
          const privateKey = keyPair.toWIF();

          const wallet = {
            symbol: this.symbol,
            address,
            privateKey,
          };

          return wallet;
        } catch {
          this.errorInServer();
        }
        break;
      }
    }
  }

  async userSetWallet() {
    if (!this.authorization || !this.symbol) return;

    const [, token] = this.authorization.split(' ');
    const authData = jwt.decode(token) as { id: string };

    const user = await usersModel.findById(authData.id).select(['wallet']);
    if (!user) return;

    if (!user.wallet.map(val => val.symbol).includes(this.symbol)) {
      const createdWallet = await this.createWallets();
      user.wallet.push(createdWallet!);
      await user.save();
      return createdWallet;
    }

    const wallet = user.wallet.find(val => val.symbol === this.symbol);
    return wallet;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

import usersModel, { UserDocumentType } from '../models/users';
import fetchKucoinApi from '@/services/fetchKucoinApi';
import { BaseRoute } from '../route';

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
  const authorization = req.headers.get('authorization');
  const body: BodyType = await req.json();

  const withdrawalUser = new WithdrawalUser(authorization, body);
  const errors = withdrawalUser.errors;

  try {
    withdrawalUser.verifyAuthorization();
    if (errors.length) {
      return withdrawalUser.responseError(errors[0]);
    }
    withdrawalUser.clearUpBody();
    await withdrawalUser.connectDb();
    if (errors.length) {
      return withdrawalUser.responseError(errors[0]);
    }
    await withdrawalUser.initWithdrawal();
    if (errors.length) {
      return withdrawalUser.responseError(errors[0]);
    }

    return withdrawalUser.responseSuccess({
      body: {
        msg: 'Cryptos sent to the given address',
        type: 'server',
      },
      status: 200,
    });
  } catch (err) {
    // console.log(err);
    return withdrawalUser.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class WithdrawalUser extends BaseRoute {
  private user:
    | (Document<unknown, {}, Pick<UserDocumentType, 'transactions'>> & // eslint-disable-line
        Pick<UserDocumentType, 'transactions'> & {
          _id: Types.ObjectId;
        })
    | null = null;

  constructor(
    protected readonly authorization: string | null,
    private body: BodyType
  ) {
    super(authorization);
  }

  async initWithdrawal() {
    if (!this.authorization) return;
    try {
      const [, token] = this.authorization.split(' ');
      const authData = jwt.decode(token) as { id: string };

      this.user = await usersModel
        .findById(authData.id)
        .select(['transactions', 'cryptos']);
      if (!this.user) {
        this.errors.push({
          body: {
            msg: 'User not found',
            type: 'server',
          },
          status: 400,
        });
        return;
      }
      await this.verifyUserCryptoBalance();
    } catch {
      this.errorInServer();
    }
  }

  private getUserCryptoBalance() {
    if (!this.user) return 0;
    const { cryptoSymbol } = this.body;
    const { transactions } = this.user;
    const userCryptoBalance = transactions
      .filter(val => val.symbol === cryptoSymbol && val.type === 'crypto')
      .reduce((prev, val) => prev + val.cryptoValue, 0);
    return userCryptoBalance;
  }

  private async verifyUserCryptoBalance() {
    const { amountWithdrawalCrypto } = this.body;
    const userCryptoBalance = this.getUserCryptoBalance();
    if (amountWithdrawalCrypto > userCryptoBalance) {
      this.errors.push({
        body: {
          msg: 'Insufficient funds',
          type: 'amount',
        },
        status: 400,
      });
      return;
    }
    await this.sendCryptoKucoin();
  }

  private async sendCryptoKucoin() {
    try {
      const { cryptoSymbol, walletAddress, amountSendCryptoKucoin } = this.body;
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
      if (errKucoin) {
        if (errKucoin.msg === 'Incorrect withdrawal address.') {
          this.errors.push({
            body: {
              msg: errKucoin.msg.replace('.', ''),
              type: 'walletAddress',
            },
            status: 400,
          });
          return;
        }
        this.errors.push({
          body: {
            msg: 'An error occurred while sending your cryptos',
            type: 'server',
          },
          status: 400,
        });
        return;
      }
      const withdrawalId: string = dataKucoin.withdrawalId;
      await this.sendCryptoUser(withdrawalId);
    } catch {
      this.errorInServer();
    }
  }

  private async sendCryptoUser(withdrawalId: string) {
    if (!this.user) return;
    try {
      const { cryptoName, cryptoSymbol, amountWithdrawalCrypto } = this.body;

      this.user.transactions.push({
        title: 'withdrawal',
        date: Date.now() * 1000,
        name: cryptoName,
        status: 'pending',
        symbol: cryptoSymbol,
        type: 'crypto',
        cryptoValue: -amountWithdrawalCrypto,
        dollarValue: 0,
        withdrawalId,
      });
      await this.user.save();
    } catch {
      this.errorInServer();
    }
  }

  clearUpBody() {
    this.body = {
      amountWithdrawalCrypto: this.body.amountWithdrawalCrypto || 0,
      amountWithdrawalDollar: this.body.amountWithdrawalDollar || 0,
      amountSendCryptoKucoin: this.body.amountSendCryptoKucoin || 0,
      cryptoName: this.body.cryptoName || '',
      cryptoSymbol: this.body.cryptoSymbol || '',
      walletAddress: this.body.walletAddress || '',
    };
  }
}

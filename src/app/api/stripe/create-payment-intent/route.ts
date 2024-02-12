import minimumDeposit from '@/services/minimunDeposit';
import { NextRequest, NextResponse } from 'next/server';
import { has } from 'lodash';
import jwt from 'jsonwebtoken';

import Stripe from 'stripe';
import usersModel from '../../models/users';
import BaseRoute from '../../baseRoute';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface BodyType {
  depositAmount: number;
}

export async function POST(req: NextRequest) {
  const authorization = req.headers.get('authorization');
  const createPayment = new CreatePayment(authorization);
  const errors = createPayment.errors;
  const body: BodyType = await req.json();

  try {
    createPayment.verifyAuthorization();
    if (errors.length) {
      return createPayment.responseError(errors[0]);
    }
    createPayment.connectDb();
    if (errors.length) {
      return createPayment.responseError(errors[0]);
    }
    const paymentIntent = await createPayment.deposit(body);
    if (errors.length) {
      return createPayment.responseError(errors[0]);
    }

    return NextResponse.json({ clientSecret: paymentIntent?.client_secret });
  } catch (err: any) {
    return createPayment.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class CreatePayment extends BaseRoute {
  constructor(protected readonly authorization?: string | null) {
    super(authorization);
  }

  async deposit(body: BodyType) {
    try {
      if (!this.authorization) return;

      if (!has(body, 'depositAmount')) {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: 'BRL', // default USD
          amount: minimumDeposit,
          automatic_payment_methods: { enabled: true },
        });

        return paymentIntent;
      }

      const [, token] = this.authorization.split(' ');
      const authData = jwt.decode(token) as { id: string };

      const { depositAmount } = body;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'BRL', // default USD
        amount: depositAmount,
        automatic_payment_methods: { enabled: true },
      });

      const user = await usersModel.findById(authData.id);
      if (!user) return;
      user.transactions.push({
        cryptoValue: 0,
        date: Date.now(),
        dollarValue: +(depositAmount / 100).toFixed(2),
        name: 'Dollar',
        status: 'success',
        symbol: 'USD',
        title: 'Deposit',
        type: 'dollar',
      });
      await user.save();

      return paymentIntent;
    } catch (err: any) {
      this.errors.push({
        body: {
          msg: 'Error when making deposit',
          type: 'server',
        },
        status: 400,
      });
    }
  }
}

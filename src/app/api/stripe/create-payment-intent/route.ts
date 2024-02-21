import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import Stripe from 'stripe';
import BaseRoute from '../../baseRoute';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface BodyType {
  depositAmount: number;
  depositAmountDollar: number;
  currency: string;
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
      let { depositAmount, depositAmountDollar, currency } = body;

      const [, token] = this.authorization!.split(' ');
      const { id } = jwt.decode(token) as { id: string };

      // console.log(depositAmount / 100);
      const paymentIntent = await stripe.paymentIntents.create({
        currency,
        amount: depositAmount, // valor de deposito com a moeda ultilizada
        automatic_payment_methods: { enabled: true },
        metadata: {
          depositAmountDollar, // valor de deposito sempre em dolares
          userId: id,
        },
      });

      return paymentIntent;
    } catch (err: any) {
      // console.log(err);
      this.errors.push({
        body: {
          msg: 'An error occurred while processing deposit, please try again',
          type: 'server',
        },
        status: 400,
      });
    }
  }
}

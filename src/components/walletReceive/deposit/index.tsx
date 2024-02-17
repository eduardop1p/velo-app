'use client';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

import Payment from './payment';

export type StripePromiseType = Promise<Stripe | null> | null;

export default function Deposit({
  token,
  depositAmount,
  currency,
}: {
  token: string;
  depositAmount: number;
  currency: string;
}) {
  const [stripePromise, setStripePromise] = useState<StripePromiseType>(null);

  useEffect(() => {
    const getStripe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/config`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { publishableKey } = await res.json();
        setStripePromise(loadStripe(publishableKey));
      } catch (err) {
        // console.log(err);
      }
    };
    getStripe();
  }, [token]);

  return (
    <Payment
      stripePromise={stripePromise}
      token={token}
      depositAmount={depositAmount}
      currency={currency}
    />
  );
}

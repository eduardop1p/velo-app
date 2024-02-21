'use client';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import Payment from './payment';
import { OpenAlertType } from '@/components/alertMsg';
import { AddDepositType } from '..';

export type StripePromiseType = Promise<Stripe | null> | null;

export default function Deposit({
  token,
  depositAmount,
  depositAmountDollar,
  currency = 'USD',
  setOpenAlert,
  setAddDeposit,
}: {
  token: string;
  depositAmount: number;
  depositAmountDollar: number;
  currency?: string;
  setOpenAlert: Dispatch<SetStateAction<OpenAlertType>>;
  setAddDeposit: Dispatch<SetStateAction<AddDepositType>>;
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
      depositAmountDollar={depositAmountDollar}
      currency={currency}
      setOpenAlert={setOpenAlert}
      setAddDeposit={setAddDeposit}
    />
  );
}

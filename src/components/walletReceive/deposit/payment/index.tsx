'use client';

import { useCallback, useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../checkoutForm';
import { StripePromiseType } from '..';
import SkeletonUi from '@/components/skeletonUI';

export default function Payment({
  stripePromise,
  token,
  depositAmount,
}: {
  stripePromise: StripePromiseType;
  token: string;
  depositAmount: number;
}) {
  const [clientSecret, setClientSecret] = useState<string | undefined>('');
  const [initalRender, setInitialRender] = useState(true);

  const handleGetClientSecret = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ depositAmount }),
        }
      );
      const data: { clientSecret: string } = await res.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  }, [token, depositAmount]);

  useEffect(() => {
    if (initalRender) {
      handleGetClientSecret();
      setInitialRender(false);
    }
  }, [initalRender, handleGetClientSecret]);

  if (!clientSecret || !stripePromise) return <SkeletonForm />;

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            locale: 'en',
            fonts: [
              {
                cssSrc: 'https://fonts.googleapis.com/css?family=Poppins',
              },
            ],
            appearance: {
              theme: 'stripe',
              variables: {
                fontFamily: 'Poppins',
              },
              rules: {
                '.Label': {
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#fff',
                },
                '.Error': {
                  marginTop: '5px',
                  fontSize: '12px',
                },
              },
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

const SkeletonForm = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <SkeletonUi width="100%" height={44} />
      <div className="flex gap-3 w-full">
        <div className="flex flex-col gap-2 w-1/2">
          <SkeletonUi width="30%" height={20} />
          <SkeletonUi width="100%" height={44} />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <SkeletonUi width="20%" height={20} />
          <SkeletonUi width="100%" height={44} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonUi width="20%" height={20} />
        <SkeletonUi width="100%" height={44} />
      </div>
      <SkeletonUi width="100%" height={44} />
    </div>
  );
};

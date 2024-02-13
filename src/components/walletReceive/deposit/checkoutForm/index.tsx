'use client';

import { PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import AlertMsg, { OpenAlertType } from '@/components/alertMsg';
import Loading from '@/components/loading';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/wallet`,
        },
      });
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setOpenAlert({
          msg: error.message as string,
          open: true,
          severity: 'error',
        });
      } else {
        throw new Error('err');
      }
    } catch {
      setOpenAlert({
        msg: 'An unexpected error occurred',
        open: true,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute">
        <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      </div>
      {isLoading && <Loading />}
      <form
        id="payment-form"
        onSubmit={handleFormSubmit}
        className="w-full h-fit flex flex-col"
      >
        <PaymentElement id="payment-element" />
        <button
          type="submit"
          id="submit"
          className="w-[180px] h-11 rounded bg-blue hover:bg-bluehover text-primary font-medium text-[15px] mt-6 transition-colors duration-200 flex items-center justify-center"
        >
          Deposit now
        </button>
      </form>
    </>
  );
}

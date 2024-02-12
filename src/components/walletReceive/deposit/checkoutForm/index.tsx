'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, FormEvent, SetStateAction } from 'react';

import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import AlertMsg, { OpenAlertType } from '@/components/alertMsg';
import Loading from '@/components/loading';
import replaceCurrency from '@/services/replaceCurrency';
import minimumDeposit from '@/services/minimunDeposit';

const zodSchema = z.object({
  depositAmount: z
    .string()
    .trim()
    .min(1, 'Required field')
    .refine(
      val => replaceCurrency(val) >= minimumDeposit,
      `The minimum deposit amount is $${(minimumDeposit / 100).toFixed(2)}`
    ),
});

type BodyType = z.infer<typeof zodSchema>;

export default function CheckoutForm({
  setClientSecret,
  token,
}: {
  setClientSecret: Dispatch<SetStateAction<string | undefined>>;
  token: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const handleFormSubmit: SubmitHandler<BodyType> = async (body, event) => {
    event?.preventDefault();

    if (!stripe || !elements || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const { depositAmount } = body;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-payment-intent`,
        {
          method: 'POST',
          body: JSON.stringify({
            depositAmount: replaceCurrency(depositAmount),
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) throw new Error('err');
      const data: { clientSecret: string } = await res.json();
      setClientSecret(data.clientSecret);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/wallet?confirm-deposit=true`,
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

  const handleMaskMoney = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value.replace(/\D/g, '');
    value = handleFormatPrice(value);
    currentTarget.value = value;
  };

  const handleFormatPrice = (value: string | number) => {
    value = (+value / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return value;
  };

  return (
    <>
      <div className="absolute">
        <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      </div>
      {isLoading && <Loading />}
      <form
        id="payment-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-1/2 h-fit flex flex-col"
      >
        <div className="flex flex-col mb-[0.75rem]">
          <label
            htmlFor="depositAmount"
            className="text-primary text-sm font-normal mb-2"
          >
            Deposit amount
          </label>
          <input
            type="text"
            id="depositAmount"
            placeholder="$0,00"
            // eslint-disable-next-line
            className={`border-none p-[0.75rem] bg-f1f1f1 text-30313D opacity-90 placeholder:text-30313D placeholder:opacity-80 rounded text-base h-[44px] ${errors['depositAmount'] ? 'shadow-error' : 'focus:shadow-focus'} transition-shadow duration-150`}
            {...register('depositAmount')}
            onInput={handleMaskMoney}
          />
          {errors['depositAmount'] && (
            <span className="text-xs font-normal text-red-600 mt-[5px]">
              {errors['depositAmount'].message}
            </span>
          )}
        </div>
        <PaymentElement id="payment-element" />
        <button
          type="submit"
          id="submit"
          className="w-[200px] h-11 rounded bg-blue hover:bg-bluehover text-primary font-medium text-[15px] mt-6 transition-colors duration-200 flex items-center justify-center"
        >
          Deposit
        </button>
      </form>
    </>
  );
}

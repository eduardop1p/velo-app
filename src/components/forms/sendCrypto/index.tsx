'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, type FormEvent, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Inputmask from 'inputmask';
import { useContext } from 'react';

import AlertMsg from '@/components/alertMsg';
import { OpenAlertType } from '@/components/alertMsg';
import FormErrorMsg from '../errorMsg';
import replaceCurrency from '@/services/replaceCurrency';
import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';

interface Props {
  cryptoImgUrl: string;
  withdrawMinFeeRate: string;
  cryptoName: string;
  cryptoSymbol: string;
  withdrawMinSize: number | string;
}

const zodSchema = z
  .object({
    amount: z
      .string()
      .trim()
      .min(1, 'The field is mandatory')
      .superRefine((val, ctx) => {
        const newValue = replaceCurrency(val);
        if (!newValue) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'The field is mandatory',
            fatal: true,
          });
          return;
        }
      }),
    withdrawMinSize: z.string(),
  })
  .refine(
    val => replaceCurrency(val.amount) >= replaceCurrency(val.withdrawMinSize),
    {
      path: ['amount'],
      message: 'Amount less than the minimum withdrawal',
    }
  );

type BodyType = z.infer<typeof zodSchema>;

export default function FormSendCrypto({
  cryptoImgUrl,
  withdrawMinFeeRate,
  cryptoName,
  cryptoSymbol,
  withdrawMinSize,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;

  useEffect(() => {
    register('withdrawMinSize', {
      value: withdrawMinSize.toString(),
    });
  }, [register, withdrawMinSize, cryptoSymbol]);

  const handleMask = useCallback(() => {
    const amount = document.querySelector('#amount') as HTMLInputElement;
    let maskFormat = cryptoSymbol === 'BTC' ? '9{+}.99999999' : '9{+}.999999';
    // if (parseFloat(amount.value) > 999) {
    //   maskFormat =
    //     cryptoSymbol === 'BTC' ? '9{+},999.99999999' : '9{+},999.999999';
    // }

    const mask = new Inputmask({
      mask: maskFormat,
      greedy: false,
      placeholder: '0',
      showMaskOnHover: false,
    });
    mask.mask(amount);
    return amount;
  }, [cryptoSymbol]);

  useEffect(() => {
    const amount = handleMask();

    return () => {
      if (amount.inputmask) amount.inputmask.remove();
    };
  }, [handleMask]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    console.log(body);
  };

  const handleInputAmount = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = +currentTarget.value;
    const elValue = document.querySelector('#value') as HTMLInputElement;

    elValue.value = (value * realTimePriceCrypto.current).toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-2/3">
      <div className="w-full flex gap-8">
        <div className=" flex flex-col gap-[2px] w-1/2">
          <small className="text-primary-2 font-normal text-xs">Amount</small>
          {/* eslint-disable-next-line */}
          <div className={`flex items-center gap-4 border-b-[1.5px] border-solid ${errors.amount ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
            <div className="flex items-center gap-1">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${cryptoImgUrl}`}
                alt={cryptoName}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-primary font-medium text-[15px]">
                {cryptoSymbol}
              </span>
            </div>
            <input
              id="amount"
              type="text"
              placeholder={cryptoSymbol === 'BTC' ? '0.00000000' : '0.000000'}
              className={`w-full bg-transparent text-sm font-normal ${errors.amount ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
              {...register('amount')}
              onInput={handleInputAmount}
            />
          </div>
          <span className="text-[10px] mt-[2px] h-[15px] text-red-600 font-normal">
            {errors.amount?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <small className="text-primary-2 font-normal text-xs">Value</small>
          <div className=" flex flex-col gap-1">
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-4 border-b-[1.5px] border-solid border-ffffff33 pb-[5px] w-full`}>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/imgs/velo-img-20.webp"
                  alt="dollar"
                  width={28}
                  height={28}
                  className="rounded-full scale-90"
                />
                <span className="text-primary font-medium text-sm">USD</span>
              </div>
              <input
                id="value"
                type="text"
                placeholder="$0.00"
                className="w-full bg-transparent text-sm font-normal text-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

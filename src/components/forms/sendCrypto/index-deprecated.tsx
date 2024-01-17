'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, type FormEvent, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Inputmask from 'inputmask';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

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
  cryptoName: string;
  cryptoSymbol: string;
  withdrawMinSize: number;
  userBalance: number;
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
    userBalance: z.string(),
  })
  .superRefine((val, ctx) => {
    const newAmount = replaceCurrency(val.amount);
    const newWithdrawMinSize = replaceCurrency(val.withdrawMinSize);
    const newUserBalance = replaceCurrency(val.userBalance);

    if (!newUserBalance) {
      ctx.addIssue({
        path: ['amount'],
        code: z.ZodIssueCode.custom,
        message: 'Insufficient funds',
        fatal: true,
      });
      return;
    }
    if (newAmount < newWithdrawMinSize || newUserBalance < newWithdrawMinSize) {
      ctx.addIssue({
        path: ['amount'],
        code: z.ZodIssueCode.custom,
        message: 'Amount less than the minimum withdrawal',
        fatal: true,
      });
      return;
    }
  });

type BodyType = z.infer<typeof zodSchema>;

export default function FormSendCrypto({
  cryptoImgUrl,
  cryptoName,
  cryptoSymbol,
  withdrawMinSize,
  userBalance,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    clearErrors,
    setFocus,
    trigger,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const router = useRouter();

  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;

  const handleFixedPoint = useCallback(
    (value: number) => {
      return value.toFixed(cryptoSymbol === 'BTC' ? 8 : 6);
    },
    [cryptoSymbol]
  );

  useEffect(() => {
    register('withdrawMinSize', {
      value: handleFixedPoint(withdrawMinSize),
    });
  }, [register, withdrawMinSize, handleFixedPoint]);

  useEffect(() => {
    if (!realTimePriceCrypto.current) return;
    register('userBalance', {
      value: handleFixedPoint(userBalance / realTimePriceCrypto.current),
    });
  }, [handleFixedPoint, realTimePriceCrypto, register, userBalance]);

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

  const handleInputAmount = () => {
    const elAmount = document.querySelector('#amount') as HTMLInputElement;
    const elValue = document.querySelector('#value') as HTMLInputElement;
    let value = +elAmount.value;

    elValue.value = (value * realTimePriceCrypto.current).toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      }
    );
  };

  const handleAddMinValueToAmount = () => {
    setFocus('amount');
    setValue('amount', handleFixedPoint(withdrawMinSize));
    setValue(
      'userBalance',
      handleFixedPoint(userBalance / realTimePriceCrypto.current)
    );
    handleInputAmount();
    clearErrors('amount');
    trigger('amount', {
      shouldFocus: false,
    });
  };

  const handleAddAllToAmount = () => {
    setFocus('amount');
    setValue(
      'amount',
      handleFixedPoint(userBalance / realTimePriceCrypto.current)
    );
    setValue(
      'userBalance',
      handleFixedPoint(userBalance / realTimePriceCrypto.current)
    );
    handleInputAmount();
    trigger('amount', {
      shouldFocus: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-2/3 flex flex-col gap-8"
    >
      <div className="w-full flex gap-8">
        <div className="flex flex-col gap-1 w-1/2">
          <div className="flex flex-col gap-[2px] w-full">
            <small className="text-primary-2 font-normal text-xs">Amount</small>
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-1 border-b-[1.5px] border-solid ${errors.amount ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
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
                className={`w-[80%] bg-transparent text-sm font-normal ${errors.amount ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
                {...register('amount')}
                onInput={handleInputAmount}
              />
            </div>
            <span className="text-[10px] mt-[2px] h-[15px] text-red-600 font-normal">
              {errors.amount?.message}
            </span>
          </div>
          <div className="w-full flex gap-3">
            <button
              type="button"
              className="py-2 px-4 bg-464c51ff text-primary w-fit rounded text-xs"
              onClick={handleAddMinValueToAmount}
            >
              Minimum value
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-464c51ff text-primary w-fit rounded text-xs"
              onClick={handleAddAllToAmount}
            >
              All
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <small className="text-primary-2 font-normal text-xs">Value</small>
          <div className=" flex flex-col gap-1">
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-1 border-b-[1.5px] border-solid border-ffffff33 pb-[5px] w-full`}>
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
                className="w-[80%] bg-transparent text-sm font-normal text-primary"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex self-start gap-4">
        <button
          type="button"
          className="text-[13px] font-normal text-primary border-1 border-solid rounded border-primary px-4 py-3 w-[135px] cursor-pointer"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          // eslint-disable-next-line
          className={`text-[13px] font-normal ${isValid ? 'bg-bluehover hover:bg-blue text-primary cursor-pointer' : 'bg-383b3eff cursor-default text-ffffff4d'} transition-colors duration-200 rounded px-4 py-3 w-[135px] `}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

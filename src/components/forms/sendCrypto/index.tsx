/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import Inputmask from 'inputmask';
import { useRouter } from 'next/navigation';

import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';
import formatPrice from '@/services/formatPrice';

interface Props {
  cryptoImgUrl: string;
  cryptoName: string;
  cryptoSymbol: string;
  withdrawMinSize: number;
  userBalance: number;
  cryptoPrice: number;
}

const zodSchema = z
  .object({
    amount: z
      .any()
      .transform(val => +val)
      .refine(val => !!val, 'The field is mandatory'),
    withdrawMinSize: z.number(),
    userCryptoBalance: z.number(),
    usdValue: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    const { amount, withdrawMinSize, userCryptoBalance } = val;
    if (userCryptoBalance < amount) {
      ctx.addIssue({
        path: ['amount'],
        code: z.ZodIssueCode.custom,
        message: 'Insufficient funds.',
        fatal: true,
      });
      return;
    }
    if (amount < withdrawMinSize) {
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
  cryptoPrice,
}: Props) {
  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const [initialRender, setInitialRender] = useState(true);

  const router = useRouter();

  const handleCryptoFixedPoint = useCallback(
    (value: number) => {
      return +value.toFixed(cryptoSymbol === 'BTC' ? 8 : 6);
    },
    [cryptoSymbol]
  );

  useEffect(() => {
    const amount = document.querySelector('#amount') as HTMLInputElement;
    let maskFormat = cryptoSymbol === 'BTC' ? '9{+}.99999999' : '9{+}.999999';

    const mask = new Inputmask({
      mask: maskFormat,
      greedy: false,
      placeholder: '0',
      showMaskOnHover: false,
      showMaskOnFocus: false,
    });
    mask.mask(amount);

    return () => {
      if (amount.inputmask) amount.inputmask.remove();
    };
  }, [cryptoSymbol]);

  useEffect(() => {
    if (initialRender && cryptoPrice) {
      register('withdrawMinSize', {
        value: handleCryptoFixedPoint(withdrawMinSize),
      });
      register('userCryptoBalance', {
        value: handleCryptoFixedPoint(userBalance / cryptoPrice),
      });
      setInitialRender(false);
    }
    if (cryptoPrice) {
      setValue(
        'userCryptoBalance',
        handleCryptoFixedPoint(userBalance / cryptoPrice)
      );
    }
  }, [
    register,
    userBalance,
    cryptoPrice,
    initialRender,
    handleCryptoFixedPoint,
    setValue,
    withdrawMinSize,
  ]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    console.log(body);
  };

  const handleOnInputAmount = (amountValue: number) => {
    setValue('amount', handleCryptoFixedPoint(amountValue));
    setValue('usdValue', formatPrice(amountValue * cryptoPrice));
  };

  const handleAddMinValueToAmount = () => {
    handleOnInputAmount(withdrawMinSize);
    trigger('amount');
  };

  const handleAddAllToAmount = () => {
    handleOnInputAmount(handleCryptoFixedPoint(userBalance / cryptoPrice));
    trigger('amount');
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
                onInput={event => {
                  const value = event.currentTarget.value;
                  handleOnInputAmount(+value);
                }}
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
                id="usdValue"
                type="text"
                placeholder="$0.00"
                className="w-[80%] bg-transparent text-sm font-normal text-primary"
                {...register('usdValue')}
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

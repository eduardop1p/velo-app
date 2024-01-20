/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import Image from 'next/image';
import Inputmask from 'inputmask';
import { useRouter } from 'next/navigation';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Skeleton } from '@mui/material';

import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';
import formatPrice from '@/services/formatPrice';
import InfoPolygon from '@/components/infoPolygon';
import replaceCurrency from '@/services/replaceCurrency';
import cryptoFee from '@/services/cryptoFee';
import fetchUserSendCrypto from '@/services/fetchUserSendCrypto';
import Loading from '@/components/loading';
import AlertMsg, { OpenAlertType } from '@/components/alertMsg';

interface Props {
  cryptoImgUrl: string;
  cryptoName: string;
  cryptoSymbol: string;
  withdrawMinSize: number;
  withdrawMinFee: number;
  userCryptoBalance: number;
  token: string;
}

const zodSchema = z
  .object({
    amount: z.string().trim().min(1, 'The field is mandatory'),
    withdrawMinSize: z.number(),
    userCryptoBalance: z.number(),
    usdValue: z.string().trim(),
    walletAddress: z.string().trim().min(1, 'The field is mandatory'),
  })
  .superRefine((val, ctx) => {
    const { amount, withdrawMinSize, userCryptoBalance } = val;
    if (replaceCurrency(amount) > userCryptoBalance) {
      ctx.addIssue({
        path: ['amount'],
        code: z.ZodIssueCode.custom,
        message: 'Insufficient funds.',
        fatal: true,
      });
      return;
    }
    if (replaceCurrency(amount) < withdrawMinSize) {
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
  userCryptoBalance,
  withdrawMinFee,
  token,
}: Props) {
  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;
  const cryptoPrice = realTimePriceCrypto.current;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    watch,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const [initialRender, setInitialRender] = useState(true);
  const [showInfoWalletCrypto, setShowInfoWalletCrypto] = useState(false);
  const [showInfoNetworkCrypto, setShowInfoNetworkCrypto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });

  const refUserCryptoBalance = useRef(userCryptoBalance);

  useEffect(() => {
    if (userCryptoBalance !== refUserCryptoBalance.current) {
      setIsLoading(false);
    }
  }, [userCryptoBalance]);

  const router = useRouter();

  const handleCryptoFixedPoint = useCallback(
    (value: number) => {
      return +value.toFixed(cryptoSymbol === 'BTC' ? 8 : 6);
    },
    [cryptoSymbol]
  );

  useEffect(() => {
    const elAmount = document.querySelector('#amount') as HTMLInputElement;

    if (initialRender && elAmount && cryptoPrice) {
      let maskFormat = cryptoSymbol === 'BTC' ? '9{+}.99999999' : '9{+}.999999';

      const mask = new Inputmask({
        mask: maskFormat,
        greedy: false,
        placeholder: '0',
        showMaskOnHover: false,
        showMaskOnFocus: true,
      });
      mask.mask(elAmount);

      register('withdrawMinSize', {
        value: handleCryptoFixedPoint(withdrawMinSize),
      });
      register('userCryptoBalance', {
        value: handleCryptoFixedPoint(userCryptoBalance),
      });
      setInitialRender(false);

      // return () => {
      //   console.log(elAmount);
      //   if (elAmount?.inputmask) elAmount.inputmask.remove();
      // };
    }
  }, [
    register,
    cryptoPrice,
    cryptoSymbol,
    userCryptoBalance,
    initialRender,
    handleCryptoFixedPoint,
    withdrawMinSize,
  ]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    // console.log(body); // lembrar de mandar o valor do amount com menos 2% no valor real, cryptoFee

    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await fetchUserSendCrypto({
        amountWithdrawalCrypto: +body.amount,
        amountWithdrawalDollar: +body.amount * cryptoPrice,
        amountSendCryptoKucoin: +body.amount * cryptoFee,
        userCryptoBalance: body.userCryptoBalance,
        walletAddress: body.walletAddress,
        authorization: token,
        cryptoName,
      });
      const data = await res.json();
      if (!res.ok) {
        setOpenAlert({
          msg: data.error,
          open: true,
          severity: 'error',
        });
        return;
      }

      router.refresh();

      setOpenAlert({
        msg: data.success,
        open: true,
        severity: 'success',
      });

      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
    } catch {
      setIsLoading(false);
      setOpenAlert({
        msg: 'An error occurred',
        open: true,
        severity: 'error',
      });
    }
  };

  const handleOnInputAmount = (amountValue: number) => {
    setValue('amount', handleCryptoFixedPoint(amountValue).toString());
    setValue('usdValue', formatPrice(amountValue * cryptoPrice));
  };

  const handleAddMinValueToAmount = () => {
    handleOnInputAmount(withdrawMinSize);
    trigger('amount');
  };

  const handleAddAllToAmount = () => {
    handleOnInputAmount(handleCryptoFixedPoint(userCryptoBalance));
    trigger('amount');
  };

  const handleFormatCrypto = (value: number) => {
    if (cryptoSymbol === 'BTC') return value.toFixed(8);
    if (cryptoSymbol === 'USDT' || cryptoSymbol === 'USDC')
      return value.toFixed(2);
    return value.toFixed(6);
  };

  if (!cryptoPrice)
    return (
      <div className="flex flex-col gap-4 w-2/3">
        <div className="flex gap-8 w-full">
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '3px',
            }}
            width="50%"
            height={71}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '3px',
            }}
            width="50%"
            height={71}
          />
        </div>
        <div className="flex gap-8 w-full">
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '3px',
            }}
            width="50%"
            height={43}
          />
          <Skeleton
            variant="rectangular"
            animation="pulse"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '3px',
            }}
            width="50%"
            height={43}
          />
        </div>
        <div className="flex flex-col gap-8 mt-4 w-full">
          <div className="flex gap-8 w-full">
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{
                bgcolor: 'grey.900',
                borderRadius: '3px',
              }}
              width="50%"
              height={69}
            />
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{
                bgcolor: 'grey.900',
                borderRadius: '3px',
              }}
              width="50%"
              height={69}
            />
          </div>
          <div className="flex gap-8 w-full">
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{
                bgcolor: 'grey.900',
                borderRadius: '3px',
              }}
              width="50%"
              height={43}
            />
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{
                bgcolor: 'grey.900',
                borderRadius: '3px',
              }}
              width="50%"
              height={43}
            />
          </div>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-2/3 flex flex-col gap-4"
    >
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      {isLoading && <Loading />}
      <div className="w-full flex gap-8">
        <div className="flex flex-col gap-[2px] w-1/2">
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
      <div className="w-full flex gap-8">
        <div className="w-1/2 flex gap-3">
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
        <div className="flex flex-col gap-1 w-1/2">
          <small className="text-primary-2 font-normal text-xs ">
            Amount to receive
          </small>
          <span className="text-[15px] font-normal text-primary whitespace-nowrap">
            {+watch('amount')
              ? handleFormatCrypto(+watch('amount') * cryptoFee)
              : 0}{' '}
            {cryptoSymbol} |{' '}
            {formatPrice(
              +watch('amount') ? +watch('amount') * cryptoFee * cryptoPrice : 0
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-4 w-full">
        <div className="w-full flex gap-8">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="flex gap-2 items-center mb-1">
              <small className="text-primary-2 font-normal text-xs ">
                Wallet address
              </small>
              <div
                className="w-4 h-4 flex items-center justify-center fill-primary relative"
                onMouseOver={() => setShowInfoWalletCrypto(true)}
                onMouseOut={() => setShowInfoWalletCrypto(false)}
              >
                <IoIosInformationCircleOutline />
                {showInfoWalletCrypto && (
                  <InfoPolygon>
                    Cryptocurrencies are digital assets that live within
                    decentralized computer networks, known as blockchains. To
                    send cryptocurrency from one wallet to another, both wallets
                    must be connected to the same network.
                  </InfoPolygon>
                )}
              </div>
            </div>
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-1 border-b-[1.5px] border-solid ${errors.walletAddress ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
              <input
                id="wallet-address"
                type="text"
                placeholder="Enter a wallet you will receive"
                className={`w-[80%] bg-transparent text-sm font-normal ${errors.walletAddress ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
                {...register('walletAddress')}
              />
            </div>
            <span className="text-[10px] h-[15px] text-red-600 font-normal">
              {errors.walletAddress?.message}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <small className="text-primary-2 font-normal text-xs ">
              Estimated fee
            </small>
            <span className="text-[15px] font-normal text-primary whitespace-nowrap">
              {handleFormatCrypto(withdrawMinFee)} {cryptoSymbol} |{' '}
              {formatPrice(withdrawMinFee * cryptoFee * cryptoPrice)}
            </span>
          </div>
        </div>
        <div className="w-full flex gap-8">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="flex gap-2 items-center">
              <small className="text-primary-2 font-normal text-xs ">
                Network
              </small>
              <div
                className="w-4 h-4 flex items-center justify-center fill-primary relative"
                onMouseOver={() => setShowInfoNetworkCrypto(true)}
                onMouseOut={() => setShowInfoNetworkCrypto(false)}
              >
                <IoIosInformationCircleOutline />
                {showInfoNetworkCrypto && (
                  <InfoPolygon>
                    {`Each cryptocurrency is usually traded using its own network.
                  You don't need to worry as it will be filled in automatically.`}
                  </InfoPolygon>
                )}
              </div>
            </div>
            <span className="text-[15px] font-normal text-primary whitespace-nowrap">
              {cryptoName}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <small className="text-primary-2 font-normal text-xs ">
              Estimated time
            </small>
            <span className="text-[15px] font-normal text-primary whitespace-nowrap">
              60 minutes
            </span>
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
        <div className="bg-34383cff p-6 rounded flex items-center gap-4">
          <div className="bg-bluehover rounded-full flex items-center justify-center text-sm font-normal text-primary w-5 h-5">
            !
          </div>
          <p className="text-primary text-xs font-normal">
            Make sure the address you entered is correct. Irreversible
            operation, avoid losses in the withdrawal process.
          </p>
        </div>
      </div>
    </form>
  );
}

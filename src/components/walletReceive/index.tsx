/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import {
  Dispatch,
  SetStateAction,
  useState,
  type FormEvent,
  MouseEvent,
  useEffect,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaArrowLeft } from 'react-icons/fa6';

import { CryptoType } from '../header';
import replaceCurrency from '@/services/replaceCurrency';
import minimumDeposit from '@/services/minimunDeposit';
import formatPrice from '@/services/formatPrice';
import Deposit from './deposit';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
  token: string;
}

export default function WalletReceive({ dataCryptos, balance, token }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showReceiveDollar, setShowReceiveDollar] = useState(false);

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <>
      <ReceiveInDollar
        setShowReceiveDollar={setShowReceiveDollar}
        showReceiveDollar={showReceiveDollar}
        balance={balance}
        token={token}
      />
      <div className="relative w-full flex items-center gap-4 px-2 border-b-1 border-solid border-ffffff33 h-[40px]">
        <div className="flex justify-center items-center w-4 h-4 fill-primary">
          <FaSearch />
        </div>
        <input
          value={searchValue}
          placeholder="Search"
          id="search"
          name="search"
          type="text"
          className="w-full bg-transparent text-primary text-[15px] font-normal"
          onChange={event => setSearchValue(event.target.value)}
        />
        {searchValue && (
          <div
            className="flex justify-center items-center w-8 h-8 fill-primary cursor-pointer"
            onClick={() => setSearchValue('')}
          >
            <IoIosClose />
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        <div
          className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
            'dollar',
            'usd'
          )} rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
          onClick={() => setShowReceiveDollar(!showReceiveDollar)}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/assets/imgs/velo-img-20.webp"
              alt="dollar"
              width={25}
              height={25}
              className="rounded-full"
            />
            <h4 className="text-primary font-normal text-sm">Dollar</h4>
          </div>
          <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3>
        </div>
        {dataCryptos.map((val, index) => (
          <Link
            // eslint-disable-next-line
            href={`/wallet/receive/${val.FROMSYMBOL.toLowerCase()}`}
            key={index.toString()}
            className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
              val.NAME.toLowerCase(),
              val.FROMSYMBOL.toLowerCase()
            )} rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${val.IMAGEURL}`}
                alt={val.NAME}
                width={32}
                height={32}
                className="rounded-full"
              />
              <h4 className="text-primary font-normal text-sm">{val.NAME}</h4>
            </div>
            <h3 className="text-sm font-normal text-primary ml-10">
              {val.FROMSYMBOL}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}

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

function ReceiveInDollar({
  showReceiveDollar,
  setShowReceiveDollar,
  balance,
  token,
}: {
  showReceiveDollar: boolean;
  setShowReceiveDollar: Dispatch<SetStateAction<boolean>>;
  balance: number;
  token: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });
  const [addDeposit, setAddDeposit] = useState({
    open: false,
    depositAmount: minimumDeposit,
  });

  useEffect(() => {
    if (!showReceiveDollar && watch('depositAmount'))
      setValue('depositAmount', '');
  }, [showReceiveDollar, setValue, watch]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    // console.log(body);
    setAddDeposit({
      open: true,
      depositAmount: replaceCurrency(body.depositAmount),
    });
  };

  const handleMaskMoney = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value.replace(/\D/g, '');
    value = formatPrice(+value / 100);
    currentTarget.value = value;
  };

  const handleReplaceOptionsCurrency = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const currentTargetValue = event.currentTarget.value;
    setValue('depositAmount', formatPrice(+currentTargetValue));
    trigger('depositAmount');
  };

  return (
    <>
      <div
        // eslint-disable-next-line
        className={`bg-0006 w-full z-10 fixed h-screen justify-center items-center inset-0 ${showReceiveDollar ? 'flex' : 'hidden'}`}
        onClick={() => setShowReceiveDollar(!showReceiveDollar)}
      >
        {addDeposit.open ? (
          <div
            className={`bg-272a2eff rounded-md p-6 w-[380px] min-h-[55%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-5 relative`}
            onClick={event => event.stopPropagation()}
          >
            <div
              className="flex gap-4 items-center cursor-pointer"
              onClick={() =>
                setAddDeposit(state => ({ ...state, open: false }))
              }
            >
              <div className="w-4 h4 flex items-center justify-center fill-primary">
                <FaArrowLeft />
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-xl text-primary font-normal">
                Deposit by card
              </h2>
              <div className="flex gap-2">
                <h4 className="text-c1c5d0 text-sm font-normal">Value:</h4>
                <h4 className="text-c1c5d0 text-sm font-normal">
                  {formatPrice(addDeposit.depositAmount / 100)}
                </h4>
              </div>
            </div>
            <Deposit depositAmount={addDeposit.depositAmount} token={token} />
            <div className="flex gap-2 items-center">
              <span className="text-primary text-xs font-normal">
                Accepted cards
              </span>
              <div className="flex gap-1">
                <div className="flex justify-center items-center border-solid border border-999 rounded bg-primary">
                  <Image
                    src="/assets/svg/visa.svg"
                    alt="visa"
                    width={28}
                    height={23}
                  />
                </div>
                <div className="flex justify-center items-center bg-secondary rounded">
                  <Image
                    src="/assets/svg/mastercard.svg"
                    alt="visa"
                    width={28}
                    height={23}
                  />
                </div>
                <Image
                  src="/assets/svg/amex.svg"
                  alt="visa"
                  width={30}
                  height={25}
                />
                <Image
                  src="/assets/svg/discover.svg"
                  alt="visa"
                  width={30}
                  height={25}
                />
                <Image
                  src="/assets/svg/diners.svg"
                  alt="visa"
                  width={30}
                  height={25}
                />
                <div className="flex justify-center items-center bg-001f7d rounded">
                  <Image
                    src="/assets/svg/jcb.svg"
                    alt="visa"
                    width={30}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-272a2eff rounded-md p-6 w-[380px] min-h-[55%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-6 relative"
            onClick={event => event.stopPropagation()}
          >
            <h2 className="text-xl text-primary font-normal">
              How much do you want to deposit
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    Your current balance:
                  </h4>
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    {formatPrice(balance)}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    Minimum deposit amount:
                  </h4>
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    {formatPrice(minimumDeposit / 100)}
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-c1c5d0 font-normal text-xs">Deposit value</p>
              <div className=" flex flex-col gap-1">
                {/* eslint-disable-next-line */}
                <div className={`flex items-center gap-4 border-b-[1.5px] border-solid ${errors.depositAmount ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/assets/imgs/velo-img-20.webp"
                      alt="dollar"
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                    <span className="text-primary font-medium text-sm">
                      USD
                    </span>
                  </div>
                  <input
                    id="depositAmount"
                    type="text"
                    placeholder="$0.00"
                    className="w-full bg-transparent text-sm font-normal text-primary"
                    {...register('depositAmount')}
                    onInput={handleMaskMoney}
                  />
                </div>
                <span className="text-[10px] h-[15px] text-red-600 font-normal">
                  {errors.depositAmount?.message}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  value={50}
                  onClick={handleReplaceOptionsCurrency}
                  className="bg-383b3eff rounded py-[10px] px-[14px] text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                >
                  +50
                </button>
                <button
                  type="button"
                  value={100}
                  onClick={handleReplaceOptionsCurrency}
                  className="bg-383b3eff rounded py-[10px] px-[14px] text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                >
                  +100
                </button>
                <button
                  type="button"
                  value={250}
                  onClick={handleReplaceOptionsCurrency}
                  className="bg-383b3eff rounded py-[10px] px-[14px] text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                >
                  +250
                </button>
                <button
                  type="button"
                  value={500}
                  onClick={handleReplaceOptionsCurrency}
                  className="bg-383b3eff rounded py-[10px] px-[14px] text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                >
                  +500
                </button>
                <button
                  type="button"
                  value={balance}
                  onClick={handleReplaceOptionsCurrency}
                  className="bg-383b3eff rounded py-[10px] px-[14px] text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                >
                  All
                </button>
              </div>
            </div>
            <div className="border-ffffff33 border-solid border-b-[2px] w-full mt-4"></div>
            <div className="flex self-end gap-4">
              <button
                type="button"
                className="text-sm font-normal text-primary border-1 border-solid rounded border-primary py-1 px-4 cursor-pointer"
                onClick={() => setShowReceiveDollar(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                // eslint-disable-next-line
                className={`text-sm font-normal text-primary ${isValid ? 'bg-bluehover hover:bg-blue' : 'bg-383b3eff cursor-default'} transition-colors duration-200 rounded py-1 px-4 cursor-pointer`}
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

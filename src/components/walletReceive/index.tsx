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
  type ReactNode,
  useCallback,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaArrowLeft } from 'react-icons/fa6';

import { CryptoType } from '../header';
import replaceCurrency from '@/services/replaceCurrency';
import minimumDeposit, { MinDepositType } from '@/services/minimumDeposit';
import formatPrice from '@/services/formatPrice';
import Deposit from './deposit';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
  token: string;
}

export default function WalletReceive({ dataCryptos, balance, token }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showDepositUSD, setShowDepositUSD] = useState(false);
  const [showDepositEUR, setShowDepositEUR] = useState(false);
  const [showDepositGBP, setShowDepositGBP] = useState(false);
  const [showDepositJPY, setShowDepositJPY] = useState(false);
  const [showDepositAUD, setShowDepositAUD] = useState(false);
  const [showDepositCAD, setShowDepositCAD] = useState(false);
  const [showDepositBRL, setShowDepositBRL] = useState(false);
  const [showDepositMXN, setShowDepositMXN] = useState(false);
  const [showDepositINR, setShowDepositINR] = useState(false);
  const [showDepositIDR, setShowDepositIDR] = useState(false);

  const dataCoins = [
    {
      state: {
        set: setShowDepositUSD,
        value: showDepositUSD,
      },
      balance,
      token,
      minDeposit: minimumDeposit('$', 2000),
      location: { currency: 'USD', location: 'en-US' },
      converted: false,
      name: 'Dollar',
      img: {
        src: '/assets/imgs/velo-img-20.webp',
      },
    },
    {
      state: {
        set: setShowDepositEUR,
        value: showDepositEUR,
      },
      balance,
      token,
      minDeposit: minimumDeposit('€', 2000),
      location: { currency: 'EUR', location: 'en-DE' },
      converted: true,
      name: 'Euro',
      img: {
        src: '/assets/imgs/velo-img-21.png',
      },
    },
    {
      state: {
        set: setShowDepositGBP,
        value: showDepositGBP,
      },
      balance,
      token,
      minDeposit: minimumDeposit('£', 1500),
      location: { currency: 'GBP', location: 'en-GB' },
      converted: true,
      name: 'Pound sterling',
      img: {
        src: '/assets/imgs/velo-img-22.png',
      },
    },
    {
      state: {
        set: setShowDepositJPY,
        value: showDepositJPY,
      },
      balance,
      token,
      minDeposit: minimumDeposit('¥', 3000),
      location: { currency: 'JPY', location: 'ja-JP' },
      converted: true,
      name: 'Yen',
      img: {
        src: '/assets/imgs/velo-img-23.png',
      },
    },
    {
      state: {
        set: setShowDepositAUD,
        value: showDepositAUD,
      },
      balance,
      token,
      minDeposit: minimumDeposit('$', 3000),
      location: { currency: 'AUD', location: 'en-AU' },
      converted: true,
      name: 'Australian dollar',
      img: {
        src: '/assets/imgs/velo-img-24.png',
      },
    },
    {
      state: {
        set: setShowDepositCAD,
        value: showDepositCAD,
      },
      balance,
      token,
      minDeposit: minimumDeposit('$', 2500),
      location: { currency: 'CAD', location: 'en-CA' },
      converted: true,
      name: 'Canadian dollar',
      img: {
        src: '/assets/imgs/velo-img-25.png',
      },
    },
    {
      state: {
        set: setShowDepositBRL,
        value: showDepositBRL,
      },
      balance,
      token,
      minDeposit: minimumDeposit('R$', 8000),
      location: { currency: 'BRL', location: 'pt-BR' },
      converted: true,
      name: 'Real',
      img: {
        src: '/assets/imgs/velo-img-27.png',
      },
    },
    {
      state: {
        set: setShowDepositMXN,
        value: showDepositMXN,
      },
      balance,
      token,
      minDeposit: minimumDeposit('$', 30000),
      location: { currency: 'MXN', location: 'es-MX' },
      converted: true,
      name: 'Mexican peso',
      img: {
        src: '/assets/imgs/velo-img-28.webp',
      },
    },
    {
      state: {
        set: setShowDepositINR,
        value: showDepositINR,
      },
      balance,
      token,
      minDeposit: minimumDeposit('₹', 150000),
      location: { currency: 'INR', location: 'en-IN' },
      converted: true,
      name: 'Indian rupees',
      img: {
        src: '/assets/imgs/velo-img-29.png',
      },
    },
    {
      state: {
        set: setShowDepositIDR,
        value: showDepositIDR,
      },
      balance,
      token,
      minDeposit: minimumDeposit('Rp', 30000000),
      location: { currency: 'IDR', location: 'id-ID' },
      converted: true,
      name: 'Rs',
      img: {
        src: '/assets/imgs/velo-img-30.png',
      },
    },
  ];

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <>
      {dataCoins.map(val => (
        <DepositInfo
          key={val.name}
          setShowDeposit={val.state.set}
          showDeposit={val.state.value}
          balance={val.balance}
          token={val.token}
          minDeposit={val.minDeposit}
          location={val.location}
          converted={val.converted}
        >
          <Image
            src={val.img.src}
            alt={val.name.toLowerCase()}
            width={25}
            height={25}
            className="rounded-full"
          />
        </DepositInfo>
      ))}
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
        {dataCoins.map(val => (
          <div
            key={val.name}
            className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
              `${val.name.toLowerCase()}`,
              `${val.location.currency.toLowerCase()}`
            )} rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
            onClick={() => val.state.set(!val.state.value)}
          >
            <div className="flex items-center gap-2">
              <Image
                src={val.img.src}
                alt={val.name.toLowerCase()}
                width={25}
                height={25}
                className="rounded-full"
              />
              <h4 className="text-primary font-normal text-sm">{val.name}</h4>
            </div>
            <h3 className="text-sm font-normal text-primary ml-[33px]">
              {val.location.currency}
            </h3>
          </div>
        ))}
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

const zodSchema = z
  .object({
    depositAmount: z.string().trim().min(1, 'Required field'),
    minDeposit: z.number(),
    formatPrice: z.object({
      currency: z.string(),
      location: z.string(),
    }),
  })
  .superRefine((val, ctx) => {
    let {
      depositAmount,
      minDeposit,
      formatPrice: { currency, location },
    } = val;
    if (replaceCurrency(depositAmount) < minDeposit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `The minimum deposit amount is ${formatPrice(currency !== 'JPY' ? minDeposit / 100 : minDeposit, currency, location)}`, // eslint-disable-line
        fatal: true,
        path: ['depositAmount'],
      });
      return;
    }
  });

type BodyType = z.infer<typeof zodSchema>;

export function DepositInfo({
  showDeposit,
  setShowDeposit,
  balance,
  token,
  minDeposit,
  location,
  converted,
  children,
}: {
  showDeposit: boolean;
  setShowDeposit: Dispatch<SetStateAction<boolean>>;
  balance: number;
  token: string;
  minDeposit: { symbol: MinDepositType; value: number };
  location: {
    currency: string;
    location: string;
  };
  converted: boolean;
  children: ReactNode;
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
    depositAmount: minDeposit.value,
    currency: location.currency,
  });
  const [intialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!showDeposit && watch('depositAmount')) setValue('depositAmount', '');
  }, [showDeposit, setValue, watch]);

  useEffect(() => {
    if (intialRender) {
      register('minDeposit', { value: minDeposit.value });
      register('formatPrice.currency', { value: location.currency });
      register('formatPrice.location', { value: location.location });
      setInitialRender(false);
    }
  }, [register, intialRender, minDeposit, location]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    // console.log(body);
    setAddDeposit({
      open: true,
      depositAmount: replaceCurrency(body.depositAmount),
      currency: location.currency,
    });
  };

  const handleMaskMoney = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value.replace(/[^\d]/g, '');
    value = handleFormatPrice(+value, location.currency);
    currentTarget.value = value;
  };

  const handleFormatPrice = useCallback(
    (value: number, currency: string) => {
      switch (currency) {
        case 'JPY': {
          return formatPrice(value, location.currency, location.location);
        }

        default:
          return formatPrice(value / 100, location.currency, location.location);
      }
    },
    [location]
  );

  const handleReplaceOptionsCurrency = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const currentTargetValue = event.currentTarget.value;
    setValue(
      'depositAmount',
      formatPrice(+currentTargetValue, location.currency, location.location)
    );
    trigger('depositAmount');
  };

  return (
    <>
      <div
        // eslint-disable-next-line
        className={`bg-0006 w-full z-10 fixed h-screen justify-center items-center inset-0 ${showDeposit ? 'flex' : 'hidden'}`}
        onClick={() => setShowDeposit(!showDeposit)}
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
                <h4 className="text-c1c5d0 text-sm font-normal">
                  Value {location.currency}:
                </h4>
                <h4 className="text-c1c5d0 text-sm font-normal">
                  {handleFormatPrice(
                    addDeposit.depositAmount,
                    location.currency
                  )}
                </h4>
              </div>
            </div>
            <Deposit
              depositAmount={addDeposit.depositAmount}
              currency={addDeposit.currency}
              token={token}
            />
            <CardBrands />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-272a2eff rounded-md p-6 w-[380px] min-h-[55%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-6 relative"
            onClick={event => event.stopPropagation()}
          >
            <h2 className="text-xl text-primary font-normal">
              How much do you want to deposit?
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
                    {handleFormatPrice(minDeposit.value, location.currency)}
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
                    {children}
                    <span className="text-primary font-medium text-sm">
                      {location.currency}
                    </span>
                  </div>
                  <input
                    id="depositAmount"
                    type="text"
                    placeholder={formatPrice(
                      0,
                      location.currency,
                      location.location
                    )}
                    className="w-full bg-transparent text-sm font-normal text-primary"
                    {...register('depositAmount')}
                    onInput={handleMaskMoney}
                  />
                </div>
                <span className="text-[10px] h-[15px] text-red-600 font-normal">
                  {errors.depositAmount?.message}
                </span>
              </div>

              <BtnsAddValues
                handleReplaceOptionsCurrency={handleReplaceOptionsCurrency}
                currency={location.currency}
              />
            </div>
            <div className="border-ffffff33 border-solid border-b-[2px] w-full mt-4"></div>
            <div className="flex self-end gap-4">
              <button
                type="button"
                className="text-sm font-normal text-primary border-1 border-solid rounded border-primary py-1 px-4 cursor-pointer"
                onClick={() => setShowDeposit(false)}
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

            {converted && (
              <div className="bg-34383cff p-4 rounded flex items-center gap-4">
                <div className="bg-bluehover flex-none rounded-full flex items-center justify-center text-sm font-normal text-primary w-5 h-5">
                  !
                </div>
                <p className="text-primary text-xs font-normal">
                  Your deposit will be converted to US dollars
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}

const CardBrands = () => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-primary text-xs font-normal">Accepted cards</span>
      <div className="flex gap-1">
        <div className="flex justify-center items-center border-solid border border-999 rounded bg-primary">
          <Image src="/assets/svg/visa.svg" alt="visa" width={28} height={23} />
        </div>
        <div className="flex justify-center items-center bg-secondary rounded">
          <Image
            src="/assets/svg/mastercard.svg"
            alt="visa"
            width={28}
            height={23}
          />
        </div>
        <Image src="/assets/svg/amex.svg" alt="visa" width={30} height={25} />
        <Image
          src="/assets/svg/discover.svg"
          alt="visa"
          width={30}
          height={25}
        />
        <Image src="/assets/svg/diners.svg" alt="visa" width={30} height={25} />
        <div className="flex justify-center items-center bg-001f7d rounded">
          <Image src="/assets/svg/jcb.svg" alt="visa" width={30} height={25} />
        </div>
      </div>
    </div>
  );
};

const BtnsAddValues = ({
  currency,
  handleReplaceOptionsCurrency,
}: {
  currency: string;
  handleReplaceOptionsCurrency(event: MouseEvent<HTMLButtonElement>): void;
}) => {
  const Btns = ({ values }: { values: number[] }) => (
    <div className="flex gap-2 justify-between ">
      {values.map(value => (
        <button
          key={value}
          type="button"
          value={value}
          onClick={handleReplaceOptionsCurrency}
          className="bg-383b3eff w-full rounded py-[10px] px-3 text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
        >
          +{value}
        </button>
      ))}
    </div>
  );

  switch (currency) {
    case 'GBP': {
      return <Btns values={[15, 50, 100, 250, 500]} />;
    }
    case 'JPY': {
      return <Btns values={[3000, 5000, 10000, 25000]} />;
    }
    case 'AUD': {
      return <Btns values={[30, 50, 100, 250, 500]} />;
    }
    case 'CAD': {
      return <Btns values={[25, 50, 100, 250, 500]} />;
    }
    case 'BRL': {
      return <Btns values={[80, 150, 300, 500, 1000]} />;
    }
    case 'MXN': {
      return <Btns values={[300, 600, 1200, 2000, 3000]} />;
    }
    case 'INR': {
      return <Btns values={[1500, 3000, 4000, 6000]} />;
    }
    case 'IDR': {
      return <Btns values={[300000, 600000, 1200000, 1500000]} />;
    }

    default:
      return <Btns values={[20, 50, 100, 250, 500]} />;
  }
};

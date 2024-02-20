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
import {
  useForm,
  SubmitHandler,
  type UseFormSetFocus,
  type UseFormSetValue,
} from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaArrowLeft, FaCheck, FaMoneyBills } from 'react-icons/fa6';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

import { CryptoType } from '../header';
import replaceCurrency from '@/services/replaceCurrency';
import minimumDeposit from '@/services/minimumDeposit';
import formatPrice from '@/services/formatPrice';
import Deposit from './deposit';
import { CurrenciesType } from '@/services/fetchGetCurrencies';
import AlertMsg, { OpenAlertType } from '../alertMsg';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
  token: string;
  countriesCurrencies: CurrenciesType[];
}

export default function WalletReceive({
  dataCryptos,
  balance,
  token,
  countriesCurrencies,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showDepositUSD, setShowDepositUSD] = useState(false);

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <>
      <DepositInfo
        setShowDeposit={setShowDepositUSD}
        showDeposit={showDepositUSD}
        balance={balance}
        token={token}
        countriesCurrencies={countriesCurrencies}
      ></DepositInfo>

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
          className={`p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
          onClick={() => setShowDepositUSD(!showDepositUSD)}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-7 w-h-7 fill-green-300 ">
              <FaMoneyBills />
            </div>
            <h4 className="text-primary font-normal text-sm">Deposit fiat</h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[36px]">USD</h3> */}
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

const zodSchema = z
  .object({
    depositAmount: z // real
      .string()
      .trim()
      .refine(val => replaceCurrency(val), 'Required field'),
    depositAmountDollar: z.string().trim().min(1, 'Required field'),
  })
  .superRefine((val, ctx) => {
    let { depositAmountDollar } = val;
    if (replaceCurrency(depositAmountDollar) < minimumDeposit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `The minimum deposit amount is ${formatPrice(minimumDeposit / 100)}`, // eslint-disable-line
        fatal: true,
        path: ['depositAmountDollar'],
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
  countriesCurrencies,
}: {
  showDeposit: boolean;
  setShowDeposit: Dispatch<SetStateAction<boolean>>;
  balance: number;
  token: string;
  countriesCurrencies: CurrenciesType[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
    setFocus,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });
  const [addDeposit, setAddDeposit] = useState({
    open: false,
    depositAmount: 0, // real
    depositAmountDollar: minimumDeposit,
  });
  const [selectCurrency, setSelectCurrency] = useState<
    CurrenciesType & { open: boolean }
  >({
    name: 'United States dollar',
    code: 'USD',
    colors: {
      bg: '#eceff2',
      text: '#d73921',
    },
    symbol: '$',
    open: false,
  });
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const [initialRender, setInitialRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!showDeposit) {
      setValue('depositAmount', ''); // real
      setValue('depositAmountDollar', formatPrice(0));
    }
  }, [showDeposit, setValue, watch]);

  useEffect(() => {
    if (errors.depositAmountDollar)
      setTimeout(() => {
        setFocus('depositAmount'); // real
      }, 1);
  }, [errors, setFocus]);

  useEffect(() => {
    if (initialRender) {
      setValue('depositAmountDollar', formatPrice(0));
      setInitialRender(false);
    }
  }, [initialRender, setValue]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    setAddDeposit({
      open: true,
      depositAmount: replaceCurrency(body.depositAmount), // real
      depositAmountDollar: replaceCurrency(body.depositAmountDollar),
    });
  };

  const handleMaskMoney = async (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value.replace(/[^\d]/g, '');

    let numberValue: number;
    switch (selectCurrency.code) {
      case 'JPY': {
        numberValue = +value;
        break;
      }
      case 'JOD': {
        numberValue = +value / 1000;
        break;
      }
      case 'KWD': {
        numberValue = +value / 1000;
        break;
      }
      case 'LAK': {
        numberValue = +value;
        break;
      }
      case 'KRW': {
        numberValue = +value;
        break;
      }
      case 'VND': {
        numberValue = +value;
        break;
      }
      default:
        numberValue = +value / 100;
        break;
    }
    value = formatPrice(
      numberValue,
      selectCurrency.code,
      `en-${selectCurrency.code.slice(0, 2).toLowerCase()}`
    );

    currentTarget.value = value;
    if (!numberValue) return;
    if (selectCurrency.code === 'USD') {
      setValue('depositAmountDollar', formatPrice(numberValue));
      return;
    }
    const dollarPriceToCurrency = await handleGetCambioDallar();
    if (!dollarPriceToCurrency) {
      setOpenAlert({
        msg: 'An error occurred, try again',
        open: true,
        severity: 'error',
      });
      return;
    }

    const cambioCurrency = formatPrice(numberValue / dollarPriceToCurrency);
    setValue('depositAmountDollar', cambioCurrency);
    trigger('depositAmountDollar');
  };

  const handleGetCambioDallar = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://economia.awesomeapi.com.br/last/USD-${selectCurrency.code}`
      );
      if (!res.ok) throw new Error('request error');
      const data = await res.json();
      const bid = +data[`USD${selectCurrency.code}`].bid;
      return bid;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplaceOptionsCurrency = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const currentTargetValue = +event.currentTarget.value;
    if (selectCurrency.code === 'USD') {
      setValue('depositAmount', formatPrice(currentTargetValue));
      setValue('depositAmountDollar', formatPrice(currentTargetValue));
      trigger('depositAmountDollar');
      return;
    }

    const currencyPrice = await handleGetCambioDallar();
    if (!currencyPrice) {
      setOpenAlert({
        msg: 'An error occurred, try again',
        open: true,
        severity: 'error',
      });
      return;
    }

    setValue(
      'depositAmount',
      formatPrice(
        currentTargetValue * currencyPrice,
        selectCurrency.code,
        `en-${selectCurrency.code.slice(0, 2).toLowerCase()}`
      )
    );
    setValue('depositAmountDollar', formatPrice(currentTargetValue));
    trigger('depositAmountDollar');
  };

  return (
    <>
      <div className="absolute">
        <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      </div>
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
                <h4 className="text-c1c5d0 text-sm font-normal">Value:</h4>
                <h4 className="text-c1c5d0 text-sm font-normal">
                  {formatPrice(addDeposit.depositAmountDollar / 100)}
                </h4>
              </div>
            </div>
            <Deposit
              depositAmount={addDeposit.depositAmount} // real
              depositAmountDollar={addDeposit.depositAmountDollar}
              token={token}
              currency={selectCurrency.code}
            />
            <CardBrands />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-272a2eff rounded-md  p-6 w-[380px] min-h-[55%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-6 relative"
            onClick={event => event.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -trasnlate-y-1/2 z-[5]">
                <Image
                  src="/assets/imgs/velo-logo.png"
                  alt="logo"
                  width={35}
                  height={35}
                  className="animate-pulse duration-100"
                />
              </div>
            )}

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
                    {formatPrice(minimumDeposit / 100)}
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="text-c1c5d0 font-normal text-xs leading-none -mb-[2px]">
                  Choose a currency and value
                </p>
                <div
                  // eslint-disable-next-line
                  className={`flex items-end gap-4 border-b-[1.5px] border-solid pb-[5px] w-full ${errors.depositAmount ? 'border-red-600' : 'border-ffffff33'}`}
                >
                  <input
                    id="depositAmount"
                    type="text"
                    placeholder={formatPrice(
                      0,
                      selectCurrency.code,
                      `en-${selectCurrency.code.slice(0, 2).toLowerCase()}`
                    )}
                    className={`w-full bg-transparent text-sm font-normal text-primary`}
                    onInput={handleMaskMoney}
                    {...register('depositAmount')}
                  />
                  <div
                    className="border-l-1 border-l-ffffff33 px-2 py-1 flex cursor-pointer"
                    tabIndex={0}
                    onBlur={event => {
                      if (!event.currentTarget.contains(event.relatedTarget))
                        setSelectCurrency(state => ({ ...state, open: false }));
                    }}
                  >
                    <div
                      className="flex gap-[6px] items-center relative"
                      onClick={() =>
                        setSelectCurrency(state => ({
                          ...state,
                          open: !state.open,
                        }))
                      }
                    >
                      <div
                        className={`w-[26px] h-[26px] overflow-hidden rounded-full items-center justify-center flex text-[15px] font-medium`}
                        style={{
                          backgroundColor: selectCurrency.colors.bg,
                          color: selectCurrency.colors.text,
                        }}
                      >
                        {selectCurrency.symbol}
                      </div>
                      <span className="text-primary font-normal text-sm">
                        {selectCurrency.code}
                      </span>
                      <button
                        type="button"
                        className="w-[18px] h-[18px] fill-primary flex items-center justify-center"
                      >
                        {selectCurrency.open ? (
                          <RiArrowUpSFill />
                        ) : (
                          <RiArrowDownSFill />
                        )}
                      </button>
                    </div>
                    <SelectCurrency
                      countriesCurrencies={countriesCurrencies}
                      setSelectCurrency={setSelectCurrency}
                      selectCurrency={selectCurrency}
                      setFocus={setFocus}
                      setValue={setValue}
                    />
                  </div>
                </div>
                <span className="text-[10px] h-[15px] text-red-600 font-normal">
                  {errors.depositAmount?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-c1c5d0 font-normal text-xs">
                  You will receive
                </p>
                <div className=" flex flex-col gap-[2px]">
                  {/* eslint-disable-next-line */}
                  <div className={`flex items-center gap-4 border-b-[1.5px] border-solid pb-[5px] w-full ${errors.depositAmountDollar ? 'border-red-600' : 'border-ffffff33'}`}>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/assets/imgs/velo-img-21.png"
                        alt="usd"
                        width={25}
                        height={25}
                      />
                      <span className="text-primary font-medium text-sm">
                        USD
                      </span>
                    </div>
                    <input
                      id="depositAmountDollar"
                      type="text"
                      className={`w-full bg-transparent text-sm font-normal text-primary`}
                      {...register('depositAmountDollar')}
                      readOnly
                    />
                  </div>
                  <span className="text-[10px] h-[15px] text-red-600 font-normal">
                    {errors.depositAmountDollar?.message}
                  </span>
                </div>

                <BtnsAddValues
                  handleReplaceOptionsCurrency={handleReplaceOptionsCurrency}
                />
              </div>
            </div>

            <div className="border-ffffff33 border-solid border-b-[2px] w-full"></div>
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

            <div className="bg-34383cff p-4 rounded flex items-center gap-4">
              <div className="bg-bluehover flex-none rounded-full flex items-center justify-center text-sm font-normal text-primary w-5 h-5">
                !
              </div>
              <p className="text-primary text-xs font-normal">
                Your deposit will be converted to US dollars
              </p>
            </div>
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

const SelectCurrency = ({
  countriesCurrencies,
  setSelectCurrency,
  selectCurrency,
  setFocus,
  setValue,
}: {
  countriesCurrencies: CurrenciesType[];
  setSelectCurrency: Dispatch<
    SetStateAction<CurrenciesType & { open: boolean }>
  >;
  selectCurrency: CurrenciesType & { open: boolean };
  setFocus: UseFormSetFocus<BodyType>;
  setValue: UseFormSetValue<BodyType>;
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <div
      // eslint-disable-next-line
      className={`absolute bottom-10 w-[60%] right-6 bg-primary rounded-lg h-1/2 overflow-hidden ${selectCurrency.open ? 'block' : 'hidden'}`}
      onClick={event => event.stopPropagation()}
    >
      <div className="overflow-x-hidden overflow-y-auto pt-3 pb-4 flex flex-col w-full h-full bg-inherit">
        <div className="px-4 pb-2 border-b-1 border-solid border-b-e9ecef w-full flex items-center gap-2 bg-inherit">
          <div className="flex justify-center items-center w-[14px] h-[14px] fill-gray-500">
            <FaSearch />
          </div>
          <input
            value={searchValue}
            placeholder="Search"
            id="search"
            name="search"
            type="text"
            className="w-full bg-transparent text-secondary text-[13px] font-normal"
            onChange={event => setSearchValue(event.target.value)}
          />
        </div>

        {countriesCurrencies.map(val => (
          <div
            key={val.code}
            // eslint-disable-next-line
            className={`flex gap-2 justify-between items-center px-4 py-2 duration-200 transition-colors ${val.code === selectCurrency.code ? 'bg-e9ecef' : 'hover:bg-e9ecef'} ${handleSearchCrypto(
              val.name.toLowerCase(),
              val.code.toLowerCase()
            )}`}
            onClick={() => {
              setSelectCurrency(() => ({ ...val, open: false }));
              setValue('depositAmount', ''); // real
              setValue('depositAmountDollar', formatPrice(0));
              setFocus('depositAmount'); // real
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-[26px] h-[26px] flex-none rounded-full items-center justify-center flex overflow-hidden`}
                style={{
                  backgroundColor: val.colors.bg,
                }}
              >
                <span
                  style={{
                    color: val.colors.text,
                  }}
                  className="text-[15px] font-medium leading-none"
                >
                  {val.symbol}
                </span>
              </div>
              <div className="flex flex-col gap-[1px]">
                <span className="text-secondary font-normal text-sm leading-none">
                  {val.code}
                </span>
                <span className="text-secondary opacity-70 font-normal text-xs leading-none">
                  {val.name}
                </span>
              </div>
            </div>
            {/* eslint-disable-next-line */}
            <div className={`items-center justify-center h-4 w-4 fill-191919 ${val.code === selectCurrency.code ? 'flex' : 'hidden'}`}>
              <FaCheck />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BtnsAddValues = ({
  handleReplaceOptionsCurrency,
}: {
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

  return <Btns values={[20, 50, 100, 250, 500]} />;
};

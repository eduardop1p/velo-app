/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import {
  useState,
  type FormEvent,
  useEffect,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
  FocusEvent,
  useRef,
} from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Link from 'next/link';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa6';

import { CryptoType } from '../header';
import replaceCurrency from '@/services/replaceCurrency';
import formatPrice from '@/services/formatPrice';
import AlertMsg, { OpenAlertType } from '../alertMsg';
import delay from '@/services/delay';
import Loading from '../loading';
import FormErrorMsg from '../forms/errorMsg';
import { CountriesType } from '@/app/create-account/page';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
  dataCountries: CountriesType[];
}

export default function WalletSend({
  dataCryptos,
  balance,
  dataCountries,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showSendDollar, setShowSendDollar] = useState(false);

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
        balance={balance}
        setShowSendDollar={setShowSendDollar}
        showSendDollar={showSendDollar}
        dataCountries={dataCountries}
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
          onClick={() => setShowSendDollar(!showSendDollar)}
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
            href={`/wallet/send/${val.FROMSYMBOL.toLowerCase()}`}
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

const zodSchemaRedeem = z
  .object({
    balance: z.string(),
    currency: z
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
        if (newValue < 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Amount less than the minimum withdrawal',
            fatal: true,
          });
          return;
        }
      }),
  })
  .refine(
    val => !(replaceCurrency(val.currency) > replaceCurrency(val.balance)),
    {
      path: ['currency'],
      message: 'Insufficient funds',
    }
  );

type BodyRedeemType = z.infer<typeof zodSchemaRedeem>;

interface AddBankType {
  open: boolean;
  currency: string;
}

function ReceiveInDollar({
  showSendDollar,
  setShowSendDollar,
  balance,
  dataCountries,
}: {
  showSendDollar: boolean;
  setShowSendDollar: Dispatch<SetStateAction<boolean>>;
  balance: number;
  dataCountries: CountriesType[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<BodyRedeemType>({
    resolver: zodResolver(zodSchemaRedeem),
  });
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [addBank, setAddBank] = useState<AddBankType>({
    open: false,
    currency: '',
  });

  useEffect(() => {
    register('balance', {
      value: balance.toFixed(2),
    });
  }, [register, balance]);

  const handleFormSubmit: SubmitHandler<BodyRedeemType> = async body => {
    setAddBank({
      open: true,
      currency: body.currency,
    });
    return body;
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
    setValue('currency', formatPrice(+currentTargetValue));
    trigger('currency');
  };

  return (
    <>
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      {isLoading && <Loading />}
      <div
        // eslint-disable-next-line
        className={`bg-0006 w-full z-10 fixed h-screen justify-center items-center inset-0 ${showSendDollar ? 'flex' : 'hidden'}`}
        onClick={() => setShowSendDollar(!showSendDollar)}
      >
        {addBank.open ? (
          <BankAccount
            setAddBank={setAddBank}
            addBank={addBank}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setOpenAlert={setOpenAlert}
            dataCountries={dataCountries}
          />
        ) : (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-272a2eff rounded-md p-6 w-[380px] min-h-[60%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-6 relative"
            onClick={event => event.stopPropagation()}
          >
            <h2 className="text-xl text-primary font-normal">
              How much do you want to redeem?
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    Available balance:
                  </h4>
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    {formatPrice(balance)}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <h4 className="text-c1c5d0 text-sm font-normal">
                    Minimum value:
                  </h4>
                  <h4 className="text-c1c5d0 text-sm font-normal">$10.00</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-c1c5d0 font-normal text-xs">Value</p>
              <div className=" flex flex-col gap-1">
                {/* eslint-disable-next-line */}
                <div className={`flex items-center gap-4 border-b-[1.5px] border-solid ${errors.currency ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
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
                    id="currency"
                    type="text"
                    placeholder="$0.00"
                    className="w-full bg-transparent text-sm font-normal text-primary"
                    {...register('currency')}
                    onInput={handleMaskMoney}
                  />
                </div>
                <span className="text-[10px] h-[15px] text-red-600 font-normal">
                  {errors.currency?.message}
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
                onClick={() => setShowSendDollar(false)}
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

const zodSchemaBank = z.object({
  country: z.string().trim().min(1, 'Required field'),
  bankCode: z.string().trim().min(1, 'Required field'),
  agency: z.string().trim().min(1, 'Required field'),
  account: z.string().trim().min(1, 'Required field'),
});

type BodyBankType = z.infer<typeof zodSchemaBank>;

function BankAccount({
  addBank,
  setAddBank,
  isLoading,
  setIsLoading,
  setOpenAlert,
  dataCountries,
}: {
  addBank: AddBankType;
  setAddBank: Dispatch<SetStateAction<AddBankType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setOpenAlert: Dispatch<SetStateAction<OpenAlertType>>;
  dataCountries: CountriesType[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<BodyBankType>({
    resolver: zodResolver(zodSchemaBank),
  });
  const [showCountries, setShowCountries] = useState(false);
  const refDataCountries = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const eventOnKeyup = (event: KeyboardEvent) => {
      const elParentCountries = refDataCountries.current;
      if (!elParentCountries) return;
      const key = event.key.toLowerCase();
      const searchInList = dataCountries
        .map((val, index) => {
          if (val.name.toLowerCase().startsWith(key)) {
            return { name: val.name, index };
          }
        })
        .filter(val => typeof val !== 'undefined') as { name: string, index: number }[] // eslint-disable-line
      if (!searchInList.length) return;
      const spans = elParentCountries.childNodes as NodeListOf<HTMLSpanElement>;
      elParentCountries.scrollTop = spans[searchInList[0].index].offsetTop;
    };

    if (showCountries && refDataCountries.current) {
      window.addEventListener('keyup', eventOnKeyup);
    }

    return () => window.removeEventListener('keyup', eventOnKeyup);
  }, [showCountries, dataCountries]);

  const handleFormSubmit: SubmitHandler<BodyBankType> = async body => {
    if (isLoading) return;

    setIsLoading(true);
    await delay(Math.round(Math.random() * (6000 - 3000) + 3000));
    setOpenAlert({
      msg: 'Internal server error',
      open: true,
      severity: 'error',
    });
    setIsLoading(false);
    // console.log(body);
  };

  const handleFocusInput = (type: keyof BodyBankType) => {
    const label = document.querySelector(
      `label[for="${type}"]`
    ) as HTMLLabelElement;

    label.style.transform = 'translateY(0px)';
    label.style.fontSize = '12px';
    label.style.color = '#61686eff';
  };

  const handleBlurInput = (
    event: FocusEvent<HTMLInputElement>,
    type: keyof BodyBankType
  ) => {
    if (event.currentTarget.value) return;

    const label = document.querySelector(
      `label[for="${type}"]`
    ) as HTMLLabelElement;

    label.style.transform = 'translateY(21px)';
    label.style.fontSize = '14px';
    label.style.color = '#fff';
  };

  return (
    // eslint-disable-next-line
    <form onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-272a2eff rounded-md p-6 w-[380px] min-h-[60%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-3 relative"
      onClick={event => event.stopPropagation()}
    >
      <button
        type="button"
        className="w-4 h4 flex items-center justify-center fill-primary cursor-pointer"
        onClick={() =>
          setAddBank({
            open: false,
            currency: '',
          })
        }
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-xl text-primary font-normal my-1">Banck account</h2>

      <div
        className="flex flex-col gap-[6px]"
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setShowCountries(false);
        }}
        tabIndex={0}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="country" className="text-primary font-normal text-sm">
            Country
          </label>
          <div className="relative w-full z-[2]">
            <div
              ref={refDataCountries}
              // eslint-disable-next-line
              className={`absolute top-14 py-2 rounded-lg w-full ${showCountries ? 'flex' : 'hidden'} gap-1 flex-col bg-primary h-52 overflow-auto shadow-effect-2`}
            >
              {dataCountries.map(val => (
                <span
                  key={val.name}
                  onClick={(event: MouseEvent<HTMLSpanElement>) => {
                    setValue('country', event.currentTarget.innerText);
                    setShowCountries(false);
                  }}
                  // eslint-disable-next-line
                  className={`py-3 px-5 cursor-pointer text-[15px] font-normal ${val.name.toUpperCase() === getValues('country') ? 'text-1d4ed8 bg-EFF6FF' : 'text-495057 bg-primary hover:bg-e9ecef'} transition-colors duration-200`}
                >
                  {val.name.toUpperCase()}
                </span>
              ))}
            </div>
            <input
              readOnly
              type="text"
              id="country"
              placeholder="Enter your country"
              {...register('country')}
              // eslint-disable-next-line
              className={`bg-transparent cursor-pointer text-sm w-full text-primary font-normal border-1 ${errors['country']?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
              onClick={() => setShowCountries(!showCountries)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center fill-6c757d">
              <FaChevronDown />
            </div>
          </div>
        </div>
        {errors['country']?.message && (
          <FormErrorMsg msg={errors['country'].message} />
        )}
      </div>

      <div className="flex flex-col gap-[6px] mi-h-[80px] w-full">
        <div className="flex flex-col">
          <label
            htmlFor="bankCode"
            className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
          >
            Bank code
          </label>
          <input
            type="text"
            id="bankCode"
            // eslint-disable-next-line
            className={`bg-transparent w-full text-primary font-normal text-sm border-b-1 border-solid ${errors.bankCode?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200 pb-2`}
            {...register('bankCode', {
              onBlur(event) {
                handleBlurInput(event, 'bankCode');
              },
            })}
            onFocus={() => handleFocusInput('bankCode')}
          />
        </div>
        {errors.bankCode?.message && (
          <FormErrorMsg msg={errors.bankCode.message} />
        )}
      </div>
      <div className="flex flex-col gap-[6px] mi-h-[80px] w-full">
        <div className="flex flex-col">
          <label
            htmlFor="agency"
            className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
          >
            Agency
          </label>
          <input
            type="text"
            id="agency"
            // eslint-disable-next-line
            className={`bg-transparent w-full text-primary font-normal text-sm border-b-1 border-solid ${errors.agency?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200 pb-2`}
            {...register('agency', {
              onBlur(event) {
                handleBlurInput(event, 'agency');
              },
            })}
            onFocus={() => handleFocusInput('agency')}
          />
        </div>
        {errors.agency?.message && <FormErrorMsg msg={errors.agency.message} />}
      </div>
      <div className="flex flex-col gap-[6px] mi-h-[80px] w-full">
        <div className="flex flex-col">
          <label
            htmlFor="account"
            className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
          >
            Account
          </label>
          <input
            type="text"
            id="account"
            // eslint-disable-next-line
            className={`bg-transparent w-full text-primary font-normal text-sm border-b-1 border-solid ${errors.account?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200 pb-2`}
            {...register('account', {
              onBlur(event) {
                handleBlurInput(event, 'account');
              },
            })}
            onFocus={() => handleFocusInput('account')}
          />
        </div>
        {errors.account?.message && (
          <FormErrorMsg msg={errors.account.message} />
        )}
      </div>
      <div className="flex self-end gap-4 mt-4">
        <button
          type="button"
          className="text-sm font-normal text-primary border-1 border-solid rounded border-primary py-1 px-4 cursor-pointer"
          onClick={() =>
            setAddBank({
              open: false,
              currency: '',
            })
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          // eslint-disable-next-line
          className={`text-sm font-normal text-primary ${isValid ? 'bg-bluehover hover:bg-blue' : 'bg-383b3eff cursor-default'} transition-colors duration-200 rounded py-1 px-4 cursor-pointer`}
        >
          Withdraw
        </button>
      </div>
    </form>
  );
}

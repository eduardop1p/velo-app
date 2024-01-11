'use client';

import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { useState, type ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Inputmask from 'inputmask';

import { CryptoType } from '../header';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
}

const zodSchema = z.object({
  currency: z.string().transform(val => +val.replaceAll('$', '')),
});

type BodyType = z.infer<typeof zodSchema>;

export default function CryptosSend({ dataCryptos, balance }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    setError,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const [searchValue, setSearchValue] = useState('');
  const [showSendDollar, setShowSendDollar] = useState(false);

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    console.log(body);
  };

  useEffect(() => {
    const elcurrency = document.querySelector('#currency') as HTMLInputElement;
    const mask = new Inputmask({
      showMaskOnHover: false,
      showMaskOnFocus: false,
      alias: 'numeric',
      prefix: '$',
      suffix: '',
      radixPoint: '.',
      groupSeparator: ',',
      digits: 2,
      allowMinus: false,
      rightAlign: false,
    });
    mask.mask(elcurrency);

    return () => {
      if (elcurrency.inputmask) elcurrency.inputmask.remove();
    };
  }, []);

  return (
    <>
      <div
        // eslint-disable-next-line
        className={`bg-0006 w-full z-20 fixed h-screen justify-center items-center inset-0 ${showSendDollar ? 'flex' : 'hidden'}`}
        onClick={() => setShowSendDollar(!showSendDollar)}
      >
        <div
          className="bg-272a2eff rounded-md p-6 w-[380px] h-[480px] max-h-[90%] overflow-auto flex flex-col gap-6"
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
                  {handleFormatPrice(balance)}
                </h4>
              </div>
              <div className="flex gap-2">
                <h4 className="text-c1c5d0 text-sm font-normal">
                  Minimum value:
                </h4>
                <h4 className="text-c1c5d0 text-sm font-normal">$20.00</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-c1c5d0 font-normal text-xs">Value</p>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex items-center gap-4 border-b-1 border-solid border-ffffff33 pb-1 w-full"
            >
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/imgs/velo-img-20.webp"
                  alt="dollar"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                <span className="text-primary font-medium text-sm">USD</span>
              </div>
              <input
                id="currency"
                type="text"
                placeholder="$0.00"
                className="w-full bg-transparent text-sm font-normal text-primary"
                {...register('currency')}
              />
              <button type="submit" className="hidden"></button>
            </form>
          </div>
        </div>
      </div>
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
            'Dollar',
            'USD'
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
          <div
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
          </div>
        ))}
      </div>
    </>
  );
}

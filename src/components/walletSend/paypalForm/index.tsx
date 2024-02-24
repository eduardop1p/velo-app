'use client';

import { type FormEvent, useEffect, type MouseEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import replaceCurrency from '@/services/replaceCurrency';
import formatPrice from '@/services/formatPrice';
import AlertMsg, { OpenAlertType } from '@/components/alertMsg';
import Loading from '@/components/loading';

const zodSchema = z
  .object({
    balance: z.string(),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, 'The field is mandatory'),
    fullName: z.string().min(1, 'The field is mandatory'),
    description: z.string().optional(),
    amountSend: z
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
        if (newValue < 1000) {
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
    val => !(replaceCurrency(val.amountSend) > replaceCurrency(val.balance)),
    {
      path: ['amountSend'],
      message: 'Insufficient funds',
    }
  );

type BodyType = z.infer<typeof zodSchema>;

export default function PaypalForm({
  balance,
  token,
  minimumWithdraw,
}: {
  balance: number;
  token: string;
  minimumWithdraw: number;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });

  useEffect(() => {
    register('balance', {
      value: balance.toFixed(2),
    });

    () => setIsLoading(false);
  }, [register, balance]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    if (isLoading) return;
    const newBody = {
      method: 'withdraw',
      type: 'money',
      symbol: 'USD',
      dollarValue: replaceCurrency(body.amountSend) / 100,
      metadataDestination: {
        email: body.email,
        fullName: body.fullName,
        wallet: 'PayPal',
        description: body.description,
      },
    };
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions-wallets`,
        {
          method: 'POST',
          body: JSON.stringify(newBody),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setOpenAlert({
          msg: data.error,
          open: true,
          severity: 'error',
        });
        setIsLoading(false);
        return;
      }
      location.href = `${location.origin}/wallet?payment_withdraw=${data.transactionId}`;
    } catch (err) {
      console.log(err);
      setOpenAlert({
        msg: 'Internal server error',
        open: true,
        severity: 'error',
      });
      setIsLoading(false);
    }
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
    setValue('amountSend', formatPrice(+currentTargetValue));
    trigger('amountSend');
  };

  return (
    <>
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-2/3 flex flex-col gap-4"
      >
        <div className="w-full flex gap-8">
          <div className="flex flex-col gap-[2px] w-1/2">
            <small className="text-primary-2 font-normal text-xs">Email</small>
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-1 border-b-[1.5px] border-solid ${errors.email ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
              <input
                id="email"
                type="text"
                placeholder="PayPal account email"
                className={`w-[80%] bg-transparent text-sm font-normal ${errors.email ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
                {...register('email')}
              />
            </div>
            <span className="text-[10px] mt-[2px] h-[15px] text-red-600 font-normal">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] w-1/2">
            <small className="text-primary-2 font-normal text-xs">
              Full name
            </small>
            {/* eslint-disable-next-line */}
            <div className={`flex items-center gap-1 border-b-[1.5px] border-solid ${errors.fullName ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
              <input
                id="fullName"
                type="text"
                placeholder="PayPal account full name"
                className={`w-[80%] bg-transparent text-sm font-normal ${errors.fullName ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
                {...register('fullName')}
              />
            </div>
            <span className="text-[10px] mt-[2px] h-[15px] text-red-600 font-normal">
              {errors.fullName?.message}
            </span>
          </div>
        </div>

        <div className="w-full flex gap-8 items-start">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="flex flex-col gap-[2px] w-full">
              <small className="text-primary-2 font-normal text-xs mb-[2px]">
                Amount
              </small>
              {/* eslint-disable-next-line */}
              <div className={`flex items-center gap-1 border-b-[1.5px] border-solid ${errors.amountSend ? 'border-red-600' : 'border-ffffff33'} pb-[5px] w-full`}>
                <div className="flex items-center gap-1">
                  <Image
                    src="/assets/imgs/velo-img-21.png"
                    alt="usd"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="text-primary font-medium text-[15px]">
                    USD
                  </span>
                </div>
                <input
                  id="amountSend"
                  type="text"
                  placeholder="$0.00"
                  className={`w-[80%] bg-transparent text-sm font-normal ${errors.amountSend ? 'text-red-600' : 'text-primary'}`} // eslint-disable-line
                  {...register('amountSend')}
                  onInput={handleMaskMoney}
                />
              </div>
              <span className="text-[10px] mt-[2px] h-[15px] text-red-600 font-normal">
                {errors.amountSend?.message}
              </span>
            </div>

            <BtnsAddValues
              handleReplaceOptionsCurrency={handleReplaceOptionsCurrency}
              balance={balance}
              minimumWithdraw={minimumWithdraw}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <small className="text-primary-2 font-normal text-xs">
              Optional transaction description
            </small>
            {/* eslint-disable-next-line */}
            <div className='overflow-hidden rounded-lg w-full  h-[130px]'>
              <textarea
                {...register('description')}
                id="desciption"
                placeholder="Your description"
                className="text-primary w-full h-full font-normal text-sm p-3 resize-none border border-solid border-ffffff33 rounded-lg bg-transparent"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <small className="text-primary-2 font-normal text-xs ">
            Estimated time
          </small>
          <span className="text-[15px] font-normal text-primary whitespace-nowrap">
            60 minutes
          </span>
        </div>

        <div className="flex flex-col gap-8 mt-4 w-full">
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
              Make sure the recipient account is correct. The amount will be
              converted to your local currency.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

const BtnsAddValues = ({
  handleReplaceOptionsCurrency,
  balance,
  minimumWithdraw,
}: {
  handleReplaceOptionsCurrency(event: MouseEvent<HTMLButtonElement>): void;
  balance: number;
  minimumWithdraw: number;
}) => {
  const Btns = ({ values }: { values: number[] }) => (
    <div className="flex w-full gap-2 justify-between">
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

      <button
        type="button"
        value={minimumWithdraw}
        onClick={handleReplaceOptionsCurrency}
        className="bg-383b3eff w-full rounded py-[10px] px-3 text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
      >
        min
      </button>
      <button
        type="button"
        value={balance}
        onClick={handleReplaceOptionsCurrency}
        className="bg-383b3eff w-full rounded py-[10px] px-3 text-xs font-medium text-primary hover:opacity-70 transition-opacity duration-200 cursor-pointer"
      >
        All
      </button>
    </div>
  );

  return <Btns values={[20, 50, 100, 250, 500]} />;
};

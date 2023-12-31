'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useEffect, type MouseEvent, useRef } from 'react';
import Inputmask from 'inputmask';
import { FaChevronDown } from 'react-icons/fa6';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import AlertMsg from '../alertMsg';
import { OpenAlertType } from '../alertMsg';
import FormErrorMsg from '../formErrorMsg';
import FormLoading from '../formLoading';
import { CountriesType } from '@/app/create-account/page';
import ShowPassword, { ShowPasswordType } from '../showPassword';
import { useRouter } from 'next/navigation';

const zodSchema = z
  .object({
    name: z.string().trim().min(1, 'Required field'),
    email: z.string().trim().min(1, 'Required field').email('Invalid email'),
    dateBirth: z.string().trim().min(1, 'Required field'),
    cellPhone: z
      .string()
      .trim()
      .min(1, 'Required field')
      .refine(val => {
        const regex = /^\s*\d+(\s+\d+)*\s*$/;
        return regex.test(val);
      }, 'Invalid cell number'),
    country: z.string().trim().min(1, 'Required field'),
    password: z
      .string()
      .trim()
      .min(1, 'Required field')
      .superRefine((val, ctx) => {
        const regexPassword = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})'
        );
        if (!val.match(regexPassword)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'The password must contain at least 5 characters, including lowercase letters, uppercase letters, numbers and special characters.',
            fatal: true,
          });
          return;
        }
      }),
    repeatPassword: z.string().trim(),
  })
  .refine(val => val.password === val.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type BodyType = z.infer<typeof zodSchema>;

export default function FormCreatedAccount({
  dataCountries,
}: {
  dataCountries: CountriesType[];
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const [passwordType, setPasswordType] =
    useState<ShowPasswordType>('password');
  const refDataCountries = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();

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

  useEffect(() => {
    const dateBirth = document.querySelector('#dateBirth') as HTMLInputElement;
    const mask = new Inputmask({
      alias: 'datetime',
      inputFormat: 'yyyy/mm/dd',
      placeholder: '____/__/__',
      showMaskOnHover: false,
    });
    mask.mask(dateBirth);

    return () => {
      if (dateBirth.inputmask) dateBirth.inputmask.remove();
    };
  }, []);

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

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    if (isLoading) return;
    const { name, email, dateBirth, cellPhone, country, password } = body;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-account`,
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            dateBirth,
            cellPhone,
            country,
            password,
            balance: '0',
            invested: '0',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (data.type !== 'server') {
          setError(data.type, { message: data.error });
        }
        setOpenAlert({
          msg: data.error,
          open: true,
          severity: 'error',
        });
        return;
      }
      // setOpenAlert({
      //   msg: data.success,
      //   open: true,
      //   severity: 'success',
      // });

      await handleLogin(email, password);
      // redirecionar para login ou logar ou enviar email de confirmação e dai só depois logar aqui
    } catch (err) {
      // response.data.error
      // console.log(err);

      setOpenAlert({
        msg: 'An error occurred',
        open: true,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        credentials: 'include',
      });

      router.push('/home');
      router.refresh();
    } catch (err) {
      // console.log(err);
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col gap-5 w-3/5">
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      <h2 className="text-black text-3xl font-normal">Open your account</h2>
      <p className="text-xl text-black font-normal">
        Start here, it only takes a few minutes
      </p>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-full gap-3"
      >
        <div className="flex items-center w-full gap-4 h-[102px]">
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="flex items-center text-[15px]">
                Name
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                {...register('name')}
                maxLength={100}
                // eslint-disable-next-line
                className={`text-[15px] text-black font-normal border-1 ${errors.name?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
              />
            </div>
            {errors.name?.message && (
              <FormErrorMsg msg={errors.name.message} fontSize="text-xs" />
            )}
          </div>
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="flex items-center text-[15px]">
                Email
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <input
                type="text"
                id="email"
                defaultValue={
                  searchParams.get('email')
                    ? searchParams.get('email')?.toString()
                    : ''
                }
                placeholder="Enter your best email"
                {...register('email')}
                // eslint-disable-next-line
                className={`text-[15px] text-black font-normal border-1 ${errors.email?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
              />
            </div>
            {errors.email?.message && (
              <FormErrorMsg msg={errors.email.message} fontSize="text-xs" />
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-4 h-[102px]">
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="dateBirth"
                className="flex items-center text-[15px]"
              >
                Date of birth
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <input
                type="text"
                id="dateBirth"
                placeholder="Enter the date"
                {...register('dateBirth')}
                // eslint-disable-next-line
                className={`text-[15px] w-full text-black font-normal border-1 ${errors['dateBirth']?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
              />
            </div>
            {errors['dateBirth']?.message && (
              <FormErrorMsg
                msg={errors['dateBirth'].message}
                fontSize="text-xs"
              />
            )}
          </div>
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="cellPhone"
                className="flex items-center text-[15px]"
              >
                Cell phone
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <input
                type="text"
                id="cellPhone"
                placeholder="Enter your number"
                {...register('cellPhone')}
                // eslint-disable-next-line
                className={`text-[15px] text-black font-normal border-1 ${errors['cellPhone']?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
              />
            </div>
            {errors['cellPhone']?.message && (
              <FormErrorMsg
                msg={errors['cellPhone'].message}
                fontSize="text-xs"
              />
            )}
          </div>
        </div>
        <div
          className="flex flex-col gap-[5px] h-[102px]"
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setShowCountries(false);
          }}
          tabIndex={0}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="country" className="flex items-center text-[15px]">
              Country
              <span className="text-red-500 ml-[5px] leading-none text-sm">
                *
              </span>
            </label>
            <div className="relative w-full">
              <div
                ref={refDataCountries}
                // eslint-disable-next-line
                className={`absolute -top-52 py-2 rounded-lg w-full ${showCountries ? 'flex' : 'hidden'} gap-1 flex-col bg-primary h-52 overflow-auto shadow-effect-2`}
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
                className={`cursor-pointer text-[15px] w-full text-black font-normal border-1 ${errors['country']?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
                onClick={() => setShowCountries(!showCountries)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center fill-6c757d">
                <FaChevronDown />
              </div>
            </div>
          </div>
          {errors['country']?.message && (
            <FormErrorMsg msg={errors['country'].message} fontSize="text-xs" />
          )}
        </div>
        <div className="flex items-start w-full gap-4 min-h-[220px] ">
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className="flex items-center text-[15px]"
              >
                Password
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <div className="relative w-full">
                <input
                  type={passwordType}
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  // eslint-disable-next-line
                  className={`text-[15px] w-full text-black font-normal border-1 ${errors.password?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
                />
                <ShowPassword
                  passwordType={passwordType}
                  setPasswordType={setPasswordType}
                  fill="fill-495057"
                  right="right-3"
                />
              </div>
            </div>
            {errors.password?.message && (
              <FormErrorMsg msg={errors.password.message} fontSize="text-xs" />
            )}
            <ul className="mt-1 list-disc ml-3">
              <li className="text-[10px] text-black font-normal mb-[2px]">
                The password must have a minimum of 5 characters.
              </li>
              <li className="text-[10px] text-black font-normal mb-[2px]">
                The password must contain at least one lowercase letter
              </li>
              <li className="text-[10px] text-black font-normal mb-[2px]">
                The password should contain at least 1 uppercase character.
              </li>
              <li className="text-[10px] text-black font-normal mb-[2px]">
                The password must contain at least one numeric digit.
              </li>
              <li className="text-[10px] text-black font-normal mb-1">
                The password must contain at least one special character from
                the list: !@#$%^&*.
              </li>
              <li className="text-[10px] text-black font-normal list-none">
                Strong password example: Pass@123
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[5px] w-1/2 h-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="repeatPassword"
                className="flex items-center text-[15px]"
              >
                Confirm password
                <span className="text-red-500 ml-[5px] leading-none text-sm">
                  *
                </span>
              </label>
              <div className="relative w-full">
                <input
                  type={passwordType}
                  id="repeatPassword"
                  placeholder="confirm your password"
                  {...register('repeatPassword')}
                  // eslint-disable-next-line
                  className={`text-[15px] w-full text-black font-normal border-1 ${errors.repeatPassword?.message ? 'border-red-600' : 'border-ced4da'} border-solid rounded-md p-3 focus:shadow-effect-1 transition-shadow duration-200`}
                />
                <ShowPassword
                  passwordType={passwordType}
                  setPasswordType={setPasswordType}
                  fill="fill-495057"
                  right="right-3"
                />
              </div>
            </div>
            {errors.repeatPassword?.message && (
              <FormErrorMsg
                msg={errors.repeatPassword.message}
                fontSize="text-xs"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-normal text-69717f">
            By continuing you agree to Velo{' '}
            <Link
              href="/privacy-policy"
              className="text-195ab4ff font-normal text-sm underline"
            >
              privacy policy
            </Link>
            .
          </p>
          <button
            type="submit"
            // eslint-disable-next-line
            className={`w-full relative text-[15px] font-normal h-12 flex justify-center items-center transition-all duration-200 ${isValid ? 'bg-blue text-primary hover:bg-bluehover cursor-pointer' : 'bg-b1d2ffff text-black-neutral cursor-default'} rounded`}
          >
            Send
            {isLoading && <FormLoading />}
          </button>
        </div>
      </form>
    </div>
  );
}

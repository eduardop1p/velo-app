'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type FocusEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AlertMsg from '../alertMsg';
import { OpenAlertType } from '../alertMsg';
import FormErrorMsg from '../formErrorMsg';
import FormLoading from '../formLoading';
import ShowPassword, { ShowPasswordType } from '../showPassword';

const zodSchema = z.object({
  email: z.string().trim().min(1, 'Required field').email('Invalid email'),
  password: z.string().trim().min(1, 'Required field'),
});

type BodyType = z.infer<typeof zodSchema>;

export default function FormLogin() {
  const router = useRouter();

  const [passwordType, setPasswordType] =
    useState<ShowPasswordType>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    msg: '',
    open: false,
    severity: 'success',
  });
  const [initialRender, setInitialRender] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  useEffect(() => {
    if (initialRender) {
      const emailValue = getValues('email');
      const passWordValue = getValues('password');

      if (emailValue) {
        handleFocusInput('email');
      }
      if (passWordValue) {
        handleFocusInput('password');
      }
      setInitialRender(false);
    }
  }, [getValues, initialRender]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        credentials: 'include',
      });
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
      setOpenAlert({
        msg: `Welcome ${data.name.split(' ')[0]}`,
        open: true,
        severity: 'success',
      });

      setTimeout(() => {
        router.push('/home');
        router.refresh();
      }, 1000);
    } catch (err) {
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

  const handleFocusInput = (type: keyof BodyType) => {
    const label = document.querySelector(
      `label[for="${type}"]`
    ) as HTMLLabelElement;

    label.style.transform = 'translateY(0px)';
    label.style.fontSize = '12px';
    label.style.color = '#61686eff';
  };

  const handleBlurInput = (
    event: FocusEvent<HTMLInputElement>,
    type: keyof BodyType
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
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[456px] bg-black-section-2 rounded flex items-center flex-col justify-between gap-5 p-10"
    >
      <div className="absolute">
        <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      </div>
      <h2 className="text-primary text-2xl font-semibold">Login</h2>
      <div className="flex flex-col gap-[6px] mi-h-[80px] w-full">
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            // eslint-disable-next-line
            className={`bg-transparent w-full relative z-[2] text-primary font-normal text-sm border-b-1 border-solid ${errors.email?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200 pb-2`}
            {...register('email', {
              onBlur(event) {
                handleBlurInput(event, 'email');
              },
            })}
            onFocus={() => handleFocusInput('email')}
          />
        </div>
        {errors.email?.message && <FormErrorMsg msg={errors.email.message} />}
      </div>
      <div className="flex flex-col gap-[6px] min-h-[80px] w-full">
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={passwordType}
              id="password"
              // eslint-disable-next-line
              className={`bg-transparent w-full relative z-[2] text-primary font-normal text-sm border-b-1 border-solid ${errors.password?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200 pb-2`}
              {...register('password', {
                onBlur(event) {
                  handleBlurInput(event, 'password');
                },
              })}
              onFocus={() => handleFocusInput('password')}
            />
            <ShowPassword
              passwordType={passwordType}
              setPasswordType={setPasswordType}
              fill="fill-primary-2"
              right="right-[2px]"
            />
          </div>
        </div>
        {errors.password?.message && (
          <FormErrorMsg msg={errors.password.message} />
        )}
      </div>
      <button
        type="submit"
        // eslint-disable-next-line
        className={`${isValid ? 'bg-blue text-primary cursor-pointer hover:bg-bluehover' : 'bg-black-neutral-383b3eff text-ffffff4d cursor-default'} h-14 w-full rounded text-[15px] font-normal transition-colors duration-200 relative`}
      >
        Login
        {isLoading && <FormLoading />}
      </button>
      <div className="flex flex-col gap-1 w-full justify-start">
        <Link
          href="/create-account"
          className="text-xs text-blue font-normal underline w-fit"
        >
          {`I'm`} not a customer, I want to open my account
        </Link>
        <Link
          href="/recover-password"
          className="text-xs text-blue font-normal underline w-fit"
        >
          I forgot my password
        </Link>
      </div>
    </form>
  );
}

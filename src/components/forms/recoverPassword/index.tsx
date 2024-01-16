'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type FocusEvent, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

import AlertMsg from '../../alertMsg';
import { OpenAlertType } from '../../alertMsg';
import FormErrorMsg from '../errorMsg';
import FormLoading from '../loading';

const zodSchema = z.object({
  email: z.string().trim().min(1, 'Required field').email('Invalid email'),
});

type BodyType = z.infer<typeof zodSchema>;

export default function FormLogin() {
  const router = useRouter();

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

      if (emailValue) {
        handleFocusInput('email');
      }
      setInitialRender(false);
    }
  }, [getValues, initialRender]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recover-password`, // essa rota de api vai enviar um email para o email do body
        {
          method: 'POST',
          body: JSON.stringify(body),
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
      setOpenAlert({
        msg: 'An email has been sent with instructions',
        open: true,
        severity: 'success',
      });

      // redirecionar usuário para página principal de negociações aqui
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
      <button
        className="w-4 h-4 cursor-pointer flex justify-center items-center fill-primary self-start"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-primary text-2xl font-normal">
        Enter your email to receive the password recovery link
      </h2>
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
      <button
        type="submit"
        // eslint-disable-next-line
        className={`${isValid ? 'bg-blue text-primary cursor-pointer hover:bg-bluehover' : 'bg-black-neutral-383b3eff text-ffffff4d cursor-default'} h-14 w-full rounded text-[15px] font-normal transition-colors duration-200 relative`}
      >
        Send
        {isLoading && <FormLoading />}
      </button>
      <Link
        href="/create-account"
        className="text-xs text-blue font-normal underline w-fit self-start"
      >
        {`I'm`} not a customer, I want to open my account
      </Link>
    </form>
  );
}

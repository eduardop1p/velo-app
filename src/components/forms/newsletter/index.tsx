'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, type FocusEvent, useEffect } from 'react';

import AlertMsg from '../../alertMsg';
import { OpenAlertType } from '../../alertMsg';
import FormErrorMsg from '../errorMsg';
import FormLoading from '../loading';
import delay from '@/services/delay';

const zodSchema = z.object({
  'full-name': z.string().trim().min(1, 'Required field'),
  email: z.string().trim().min(1, 'Required field').email('Invalid email'),
  'cell-number': z
    .string()
    .trim()
    .min(1, 'Required field')
    .refine(val => {
      const regex = /^\s*\d+(\s+\d+)*\s*$/;
      return regex.test(val);
    }, 'Invalid cell number'),
});

type BodyType = z.infer<typeof zodSchema>;

export default function FormNewsletter() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid }, // a propriedade isValid vai me indicar se o vomulario é valido ou não
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      const emailValue = getValues('email');
      const cellNumberValue = getValues('cell-number');
      const fullNameValue = getValues('full-name');

      if (emailValue) {
        handleFocusInput('email');
      }
      if (cellNumberValue) {
        handleFocusInput('cell-number');
      }
      if (fullNameValue) {
        handleFocusInput('full-name');
      }
      setInitialRender(false);
    }
  }, [getValues, initialRender]);

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // enviar email aqui de inscrição newsletter no lugar de delay
      await delay(3000);

      setOpenAlert({
        msg: 'Thanks for signing up',
        open: true,
        severity: 'success',
      });
      return body;
    } catch {
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-5">
      <AlertMsg setOpenAlert={setOpenAlert} openAlert={openAlert} />
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-[6px] h-[70px]">
          <div className="flex flex-col">
            <label
              htmlFor="full-name"
              className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
            >
              Full name
            </label>
            <input
              type="text"
              id="full-name"
              // eslint-disable-next-line
              className={`bg-transparent pb-2 relative z-[2] text-primary border-b-1 border-solid font-normal text-sm ${errors['full-name']?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200`}
              {...register('full-name', {
                onBlur(event) {
                  handleBlurInput(event, 'full-name');
                },
              })}
              onFocus={() => handleFocusInput('full-name')}
            />
          </div>
          {errors['full-name']?.message && (
            <FormErrorMsg msg={errors['full-name'].message} />
          )}
        </div>
        <div className="flex flex-col gap-[6px] h-[70px]">
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
              className={`bg-transparent pb-2 relative z-[2] text-primary border-b-1 border-solid font-normal text-sm ${errors.email?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200`}
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
        <div className="flex flex-col gap-[6px] h-[70px]">
          <div className="flex flex-col">
            <label
              htmlFor="cell-number"
              className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
            >
              Cell number
            </label>
            <input
              type="text"
              id="cell-number"
              // eslint-disable-next-line
              className={`bg-transparent pb-2 relative z-[2] text-primary border-b-1 border-solid font-normal text-sm ${errors['cell-number']?.message ? 'border-red-600' : 'border-primary focus:border-f217deff'} transition-colors duration-200`}
              {...register('cell-number', {
                onBlur(event) {
                  handleBlurInput(event, 'cell-number');
                },
              })}
              onFocus={() => handleFocusInput('cell-number')}
            />
          </div>
          {errors['cell-number']?.message && (
            <FormErrorMsg msg={errors['cell-number'].message} />
          )}
        </div>
        <div className="flex gap-5 mt-2 flex-col">
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="direct"
              id="direct"
              className="w-5 h-5 cursor-pointer"
            />
            <p className="text-sm text-primary font-normal">
              I want to receive Velo Direct
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="overview"
              id="overview"
              className="w-5 h-5 cursor-pointer"
            />
            <p className="text-sm text-primary font-normal">
              I want to receive the Market Overview
            </p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        // eslint-disable-next-line
        className={`${!isValid ? 'bg-black-neutral-383b3eff text-black-neutral cursor-default' : 'bg-blue text-black hover:bg-bluehover hover:text-primary cursor-pointer'} text-sm font-medium h-10 w-64 rounded mt-10 transition-colors duration-200 relative`}
      >
        Send
        {isLoading && <FormLoading />}
      </button>
    </form>
  );
}

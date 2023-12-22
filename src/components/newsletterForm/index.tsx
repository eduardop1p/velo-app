'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import type { FocusEvent } from 'react';

import FormErrorMsg from '../formErrorMsg';

const zodSchema = z.object({
  'full-name': z.string().trim().min(1, 'Required field'),
  email: z.string().min(1, 'Required field').email('Invalid email'),
  'cell-number': z
    .string()
    .min(1, 'Required field')
    .refine(val => {
      const regex = /^\s*\d+(\s+\d+)*\s*$/;
      return regex.test(val);
    }, 'Invalid cell number'),
});

type Body = z.infer<typeof zodSchema>;

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // a propriedade isValid vai me indicar se o vomulario é valido ou não
  } = useForm<Body>({
    resolver: zodResolver(zodSchema),
  });

  const handleFormSubmit: SubmitHandler<Body> = async body => {
    console.log(body);
  };

  const handleFocusInput = (event: FocusEvent<HTMLInputElement>) => {
    const label = event.currentTarget
      .previousElementSibling as HTMLLabelElement;
    label.style.transform = 'translateY(0px)';
    label.style.fontSize = '12px';
    label.style.color = '#61686eff';
  };

  const handleBlurInput = (event: FocusEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) return;
    const label = event.currentTarget
      .previousElementSibling as HTMLLabelElement;
    label.style.transform = 'translateY(21px)';
    label.style.fontSize = '14px';
    label.style.color = '#fff';
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-5">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-[6px] h-[70px]">
          <div className="flex flex-col border-b-1 border-primary border-solid pb-2">
            <label
              htmlFor="full-name"
              className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
            >
              Full name
            </label>
            <input
              type="text"
              id="full-name"
              className="bg-transparent relative z-[2] text-primary font-normal text-sm"
              {...register('full-name', {
                onBlur(event) {
                  handleBlurInput(event);
                },
              })}
              onFocus={handleFocusInput}
            />
          </div>
          {errors['full-name']?.message && (
            <FormErrorMsg msg={errors['full-name'].message} />
          )}
        </div>
        <div className="flex flex-col gap-[6px] h-[70px]">
          <div className="flex flex-col border-b-1 border-primary border-solid pb-2">
            <label
              htmlFor="email"
              className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-transparent relative z-[2] text-primary font-normal text-sm"
              {...register('email', {
                onBlur(event) {
                  handleBlurInput(event);
                },
              })}
              onFocus={handleFocusInput}
            />
          </div>
          {errors.email?.message && <FormErrorMsg msg={errors.email.message} />}
        </div>
        <div className="flex flex-col gap-[6px] h-[70px]">
          <div className="flex flex-col border-b-1 border-primary border-solid pb-2">
            <label
              htmlFor="cell-number"
              className="translate-y-[21px] text-primary font-normal text-sm cursor-text w-full transition-all duration-200"
            >
              Cell number
            </label>
            <input
              type="text"
              id="cell-number"
              className="bg-transparent relative z-[2] text-primary font-normal text-sm"
              {...register('cell-number', {
                onBlur(event) {
                  handleBlurInput(event);
                },
              })}
              onFocus={handleFocusInput}
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
        className={`${!isValid ? 'bg-black-neutral-383b3eff text-black-neutral cursor-default' : 'bg-blue text-black hover:bg-bluehover hover:text-primary cursor-pointer'} text-sm font-medium h-10 w-64 rounded mt-10 transition-colors duration-200`}
      >
        Send
      </button>
    </form>
  );
}

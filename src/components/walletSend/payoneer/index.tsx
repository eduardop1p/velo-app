/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
  FocusEvent,
  MouseEvent,
} from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa6';

import { CountriesType } from '@/app/create-account/page';
import { OpenAlertType } from '@/components/alertMsg';
import delay from '@/services/delay';
import FormErrorMsg from '@/components/forms/errorMsg';

const zodSchema = z.object({
  country: z.string().trim().min(1, 'Required field'),
  bankCode: z.string().trim().min(1, 'Required field'),
  agency: z.string().trim().min(1, 'Required field'),
  account: z.string().trim().min(1, 'Required field'),
});

type BodyType = z.infer<typeof zodSchema>;

export default function Payoneerr({
  isLoading,
  setIsLoading,
  setOpenAlert,
  dataCountries,
}: {
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
  } = useForm<BodyType>({
    resolver: zodResolver(zodSchema),
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

  const handleFormSubmit: SubmitHandler<BodyType> = async body => {
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
    // eslint-disable-next-line
    <form onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-272a2eff rounded-md p-6 w-[380px] min-h-[60%] max-h-[90%] overflow-x-hidden overflow-y-auto flex flex-col gap-3 relative"
      onClick={event => event.stopPropagation()}
    >
      <button
        type="button"
        className="w-4 h4 flex items-center justify-center fill-primary cursor-pointer"
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

      <div className="bg-34383cff mt-2 p-4 rounded flex items-center gap-4">
        <div className="bg-bluehover flex-none rounded-full flex items-center justify-center text-sm font-normal text-primary w-5 h-5">
          !
        </div>
        <p className="text-primary text-xs font-normal">
          Please ensure that the bank account provided is correct.
        </p>
      </div>
    </form>
  );
}

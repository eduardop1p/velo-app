'use client';

import type { Dispatch, SetStateAction } from 'react';

export type ShowPasswordType = 'text' | 'password';

export default function ShowPassword({
  passwordType,
  setPasswordType,
  fill,
  right,
}: {
  passwordType: ShowPasswordType;
  setPasswordType: Dispatch<SetStateAction<ShowPasswordType>>;
  fill: string;
  right: string;
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${right} cursor-pointer z-[2]`}
    >
      {passwordType === 'password' ? (
        <div
          className={`w-[13px] h-[13px] ${fill} flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            viewBox="0 0 448 512"
            onClick={() => setPasswordType('text')}
          >
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
        </div>
      ) : (
        <div
          className={`w-[13px] h-[13px] ${fill} flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            viewBox="0 0 448 512"
            onClick={() => setPasswordType('password')}
          >
            <path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z" />
          </svg>
        </div>
      )}
    </div>
  );
}

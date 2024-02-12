'use client';

import { FaCheck } from 'react-icons/fa6';
import { useState } from 'react';

export default function AlertSuccessDeposit({
  confirmDeposit,
}: {
  confirmDeposit: boolean;
}) {
  const [showSuccessDeposit, setShowSuccessDeposit] = useState(confirmDeposit);

  if (!showSuccessDeposit) return;

  return (
    <div
      className="bg-0006 w-full z-20 fixed h-screen flex justify-center items-center inset-0"
      onClick={() => setShowSuccessDeposit(false)}
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[500px] p-6 rounded bg-primary flex flex-col gap-2 items-center"
      >
        <div className="flex rounded-full w-20 h-20 border-[3px] border-solid border-gray-b8bec4ff justify-center items-center">
          <div className="flex items-center justify-center w-10 h-10 fill-green-600">
            <FaCheck />
          </div>
        </div>
        <h2 className="text-secondary font-medium text-xl leading-none">
          Success
        </h2>
        <p className="text-base text-secondary font-normal">
          Your deposit has been processed
        </p>
        <button
          className="text-primary w-[80px] self-end py-2 rounded bg-blue hover:bg-bluehover transition-colors duration-200 text-sm font-sm"
          type="button"
          onClick={() => setShowSuccessDeposit(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}

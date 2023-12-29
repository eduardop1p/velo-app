'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

export default function Back() {
  const router = useRouter();

  return (
    <div
      className="flex gap-4 items-center cursor-pointer"
      onClick={() => router.back()}
    >
      <div className="w-4 h4 flex items-center justify-center fill-primary">
        <FaArrowLeft />
      </div>
      <span className="text-base text-primary font-normal ">Back</span>
    </div>
  );
}

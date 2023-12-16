'use client';

import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function FormLandingPage() {
  const router = useRouter();

  const emailRef = useRef<null | HTMLInputElement>(null);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValue = emailRef.current?.value;
    if (!emailValue) return;
    router.push(`/create-account?email=${emailValue}`);
  };

  return (
    <form className="flex items-center gap-6" onSubmit={handleFormSubmit}>
      <input
        ref={emailRef}
        type="text"
        name="email"
        id="email"
        placeholder="Enter your best email"
        className="text-black font-normal text-sm h-12 w-64 px-3 rounded"
      />
      <button
        type="submit"
        className="flex justify-center items-center text-sm font-normal h-12 w-40 px-3 rounded bg-blue hover:bg-bluehover text-black hover:text-primary transition-colors duration-200"
      >
        Open free account
      </button>
    </form>
  );
}

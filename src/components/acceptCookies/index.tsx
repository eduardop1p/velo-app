'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function AcceptCookies() {
  const [acceptedCookies, setAcceptedCookies] = useState(
    Cookies.get('cookiesAccepted') === 'true'
  );

  const handleAcceptCookies = () => {
    Cookies.set('cookiesAccepted', 'true', { expires: 365 });
    setAcceptedCookies(true);
  };

  if (acceptedCookies) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-10 flex w-full items-center justify-center gap-8 bg-primary px-16 py-4">
      <p className="w-1/2 text-left text-sm">
        We store cookies on your device to provide you with a better experience.
        By using this website, you agree to our privacy policy.
      </p>
      <div className="flex items-center gap-4">
        <button
          className="flex h-10 w-52 cursor-pointer items-center justify-center rounded bg-blue text-sm text-black"
          type="button"
          onClick={handleAcceptCookies}
        >
          Accept all cookies
        </button>
        <Link
          className="flex h-10 w-52 cursor-pointer items-center justify-center text-sm"
          href="/privacy-policy"
        >
          View Privacy Policy
        </Link>
      </div>
    </div>
  );
}

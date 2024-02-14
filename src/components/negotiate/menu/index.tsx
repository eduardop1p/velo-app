'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function NegotiateMenu() {
  const pathName = usePathname();

  return (
    <div className="mt-10 flex items-center">
      <Link
        href="/negotiate"
        className={`text-primary font-normal text-base pb-3 px-3 transition-colors duration-200 border-solid border-b-2 ${pathName === '/negotiate' ? 'border-b-bluehover' : 'border-b-272a2eff hover:text-blue'}`} // eslint-disable-line
      >
        Cryptoassets
      </Link>
      <Link
        href="/negotiate/recommendations"
        className={`text-primary font-normal text-base pb-3 px-3 transition-colors duration-200 border-solid border-b-2 ${pathName === '/negotiate/recommendations' ? 'border-b-bluehover' : 'border-b-272a2eff hover:text-blue'}`} // eslint-disable-line
      >
        Recommendations
      </Link>
    </div>
  );
}

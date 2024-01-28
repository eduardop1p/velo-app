'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const Notifications = dynamic(() => import('../notifications'), {
  ssr: false,
});
import { FaComments } from 'react-icons/fa6';
import type { ShowUserType } from '..';
import Settings from '../settings';

export default function AuthHeader({ userData }: { userData: ShowUserType }) {
  const pathName = usePathname();

  const handleFormatNameProfile = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(val => val.at(0))
      .join('')
      ?.toUpperCase();
  };

  const handleFormatName = (name: string) => {
    return name.split(' ').slice(0, 2).join(' ').length <= 30
      ? name.split(' ').slice(0, 2).join(' ').toUpperCase()
      : `${name.split(' ').slice(0, 2).join(' ').slice(0, 30).toUpperCase()}...`; // eslint-disable-line
  };

  return (
    <header className="h-20 flex items-center w-full fixed z-10 bg-191919 top-0 px-16 justify-center">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-14">
          <Link href="/home" className="text-primary text-4xl font-semibold">
            velo
          </Link>
          <div className="flex gap-2">
            <Link
              href="/wallet"
              // eslint-disable-next-line
              className={`text-primary font-normal text-sm h-9 px-4 flex items-center justify-center relative rounded ${pathName === '/wallet' ? 'before:content-[""] before:absolute before:w-full before:h-[3px] before:bg-blue before:top-[55px] before:left-1/2 before:-translate-x-1/2' : 'hover:bg-383b3eff'} transition-colors duration-200`}
            >
              Wallet
            </Link>
            <Link
              href="/negotiate"
              // eslint-disable-next-line
              className={`text-primary font-normal text-sm h-9 px-4 flex items-center justify-center rounded relative ${pathName === '/negotiate' ? 'before:content-[""] before:absolute before:w-full before:h-[3px] before:bg-blue before:top-[55px] before:left-1/2 before:-translate-x-1/2' : 'hover:bg-383b3eff'} transition-colors duration-200`}
            >
              Negotiate
            </Link>
            <Link
              href="/historic"
              // eslint-disable-next-line
              className={`text-primary font-normal text-sm h-9 px-4 flex items-center justify-center rounded relative ${pathName === '/historic' ? 'before:content-[""] before:absolute before:w-full before:h-[3px] before:bg-blue before:top-[55px] before:left-1/2 before:-translate-x-1/2' : 'hover:bg-383b3eff'} transition-colors duration-200`}
            >
              Historic
            </Link>
            <Link
              href="/content"
              // eslint-disable-next-line
              className={`text-primary font-normal text-sm h-9 px-4 flex items-center justify-center rounded relative ${pathName === '/content' ? 'before:content-[""] before:absolute before:w-full before:h-[3px] before:bg-blue before:top-[55px] before:left-1/2 before:-translate-x-1/2' : 'hover:bg-383b3eff'} transition-colors duration-200`}
            >
              Content
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Notifications />
          <Link
            href="/faq"
            // eslint-disable-next-line
            className={`w-5 h-w-5 flex items-center justify-center ${pathName === '/faq' ? 'fill-blue' : 'fill-primary hover:fill-blue'}  transition-colors duration-200`}
          >
            <FaComments />
          </Link>
          <div className="bg-ffffff33 h-[40px] w-[2px] flex-none"></div>
          <div className="flex items-center gap-3">
            <div className="cursor-default w-8 h-8 bg-272a2eff rounded-full flex items-center justify-center text-primary font-normal text-sm">
              {handleFormatNameProfile(userData.name)}
            </div>
            <h3
              className="text-primary text-[15px] font-medium"
              title={userData.name}
            >
              {handleFormatName(userData.name)}
            </h3>

            <Settings />
          </div>
        </div>
      </div>
    </header>
  );
}

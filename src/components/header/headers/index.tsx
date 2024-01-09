'use client';

import Link from 'next/link';
import { FaSearch, FaUser, FaComments } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import LogoTitle from '@/components/logoTitle';
import Products from '@/components/products';
import { CryptoType } from '..';
import { ShowUserType } from '..';
const Notifications = dynamic(() => import('./notifications'), {
  ssr: false,
});
import Settings from './settings';

interface Props {
  dataCurrencies: CryptoType[];
  dataSmartContract: CryptoType[];
  dataStablecoin: CryptoType[];
  dataScalling: CryptoType[];
  dataOracle: CryptoType[];
  dataMetaverse: CryptoType[];
  dataDefi: CryptoType[];
  dataInteroperability: CryptoType[];
  dataNFT: CryptoType[];
  isAuth: boolean;
  userData?: ShowUserType;
}

export default function Headers({
  dataCurrencies,
  dataSmartContract,
  dataStablecoin,
  dataScalling,
  dataOracle,
  dataMetaverse,
  dataDefi,
  dataInteroperability,
  dataNFT,
  isAuth,
  userData,
}: Props) {
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

  return isAuth && userData ? (
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
  ) : pathName !== '/create-account' ? (
    <header className="h-20 fixed top-0 flex w-full flex-row items-center justify-between bg-primary px-20 z-10 border-b-2 border-black border-solid">
      <div className="flex flex-none items-center gap-20">
        <LogoTitle fontSize="text-4xl" color="text-black" />
        <nav className="flex gap-8">
          <Link href="/about-us" className="cursor-pointer text-sm text-black">
            About us
          </Link>
          <Products
            dataCurrencies={dataCurrencies}
            dataSmartContract={dataSmartContract}
            dataStablecoin={dataStablecoin}
            dataScalling={dataScalling}
            dataOracle={dataOracle}
            dataMetaverse={dataMetaverse}
            dataDefi={dataDefi}
            dataInteroperability={dataInteroperability}
            dataNFT={dataNFT}
          />
          <Link
            href="/newsletters"
            className="cursor-pointer text-sm text-black"
          >
            Newsletters
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/faq" className="flex items-center gap-2">
          <button className="h-3 flex w-3 items-center justify-center fill-black">
            <FaSearch />
          </button>
          <span className="text-sm font-normal text-black">Help</span>
        </Link>
        <Link
          href="/login"
          className="h-11 flex w-48 cursor-pointer items-center justify-center gap-2 rounded border-1 border-solid border-black bg-none "
        >
          <button className="h-3 flex w-3 items-center justify-center fill-black">
            <FaUser />
          </button>
          <span className="text-sm font-normal text-black">Login</span>
        </Link>
        <Link
          href="/create-account"
          className="h-11 group flex w-48 cursor-pointer items-center justify-center gap-2 rounded bg-blue transition-colors duration-200 hover:bg-bluehover"
        >
          <span className="text-sm font-normal text-black transition-colors duration-200 group-hover:text-primary">
            Open your account
          </span>
        </Link>
      </div>
    </header>
  ) : (
    <header className="bg-black h-20 flex w-full items-center justify-center fixed top-0 px-20 z-10">
      <LogoTitle
        color="text-primary"
        fontSize="text-[43px]"
        font="font-semibold"
      />
    </header>
  );
}

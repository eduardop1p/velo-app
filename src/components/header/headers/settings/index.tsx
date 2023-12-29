'use client';

import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa6';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Loading from '@/components/loading';
import AlertMsg, { OpenAlertType } from '@/components/alertMsg';

export default function Settings() {
  const pathName = usePathname();
  const router = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    msg: '',
    open: false,
    severity: 'success',
  });

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
      });
      if (!res.ok) {
        setOpenAlert({
          msg: 'Logout failed. Try again',
          open: true,
          severity: 'error',
        });
        return;
      }

      router.push('/login');
      router.refresh();
    } catch (err) {
      // console.log(err);
      setOpenAlert({
        msg: 'An error occurred',
        open: true,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative"
      tabIndex={0}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setShowSettings(false);
        }
      }}
    >
      {isLoading && <Loading />}
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />
      <button
        // eslint-disable-next-line
        className={`w-[14px] h-[14px] flex justify-center items-center fill-primary cursor-pointer ${showSettings ? 'rotate-[180deg]' : 'rotate-0'} transition-transform duration-200`}
        onClick={() => setShowSettings(!showSettings)}
      >
        <FaChevronDown />
      </button>
      <div
        // eslint-disable-next-line
        className={`${showSettings ? 'flex' : 'hidden'} overflow-hidden flex-col items-start absolute top-8 bg-2e3238 rounded right-0 w-[235px]`}
        onClick={event => event.preventDefault()}
      >
        <Link
          href="/settings"
          // eslint-disable-next-line
          className={`${pathName === '/settings' ? 'bg-blue' : 'hover:bg-blue'} text-[15px] text-left transition-colors duration-200 text-primary font-normal p-4 w-full border-b-1 border-solid border-ffffff33`}
        >
          Settings
        </Link>
        <button
          className="text-[15px] bg-transparent hover:bg-blue transition-colors duration-200 text-left text-primary font-normal p-4 w-full"
          onClick={() => {
            handleLogout();
            setShowSettings(false);
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

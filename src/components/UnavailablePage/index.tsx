import { cookies } from 'next/headers';

export default function UnavailablePage() {
  const cookie = cookies();
  const isAuth = cookie.has('token');

  return (
    // eslint-disable-next-line
    <div className={`${isAuth ? 'bg-black' : 'bg-primary'} h-full-screen-80px flex items-center justify-center mt-20`}>
      <div className="flex gap-5 items-center">
        {/* eslint-disable-next-line */}
        <h2 className={`${isAuth ? 'text-primary' : 'text-black'} font-medium text-2xl`}>503</h2>
        {/* eslint-disable-next-line */}
        <span className={`h-[49px] w-[1px] ${isAuth ? 'bg-c-rgba(255,255,255,.3)' : 'bg-00000066'}`}></span>
        {/* eslint-disable-next-line */}
        <p className={`${isAuth ? 'text-primary' : 'text-black'} font-normal text-sm`}>
          This page is temporarily unavailable at this time
        </p>
      </div>
    </div>
  );
}

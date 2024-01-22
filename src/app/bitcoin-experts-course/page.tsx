import { cookies } from 'next/headers';

export default function Page() {
  const cookie = cookies();
  const isAuth = cookie.has('token');

  return (
    // eslint-disable-next-line
    <main className={`mt-20 h-full-screen-80px flex justify-center items-center ${isAuth ? 'bg-black' : 'bg-primary'}`}>
      <div className="flex items-center gap-5">
        {/* eslint-disable-next-line */}
        <h2 className={`${isAuth ? 'text-primary' : 'text-black'} font-medium text-2xl`}>Velo</h2>
        {/* eslint-disable-next-line */}
        <span className={`h-[49px] w-[1px] ${isAuth ? 'bg-c-rgba(255,255,255,.3)' : 'bg-00000066'}`}></span>
        {/* eslint-disable-next-line */}
        <p className={`text-sm font-normal ${isAuth ? 'text-primary' : 'text-black'} text-center`}>
          Page under maintenance
        </p>
      </div>
    </main>
  );
}

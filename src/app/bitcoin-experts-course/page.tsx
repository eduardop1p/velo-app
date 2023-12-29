import { cookies } from 'next/headers';

export default function Page() {
  const cookie = cookies();
  const isAuth = cookie.has('token');

  return (
    // eslint-disable-next-line
    <main className={`mt-20 h-full-screen-80px flex justify-center items-center ${isAuth ? 'bg-black' : 'bg-primary'}`}>
      {/* eslint-disable-next-line */}
      <p className={`text-base font-normal ${isAuth ? 'text-primary' : 'text-black'} text-center`}>
        Velo | Page under maintenance
      </p>
    </main>
  );
}

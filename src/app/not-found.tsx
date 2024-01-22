import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: This page could not be found',
};

export default function NotFound() {
  return (
    <div className="bg-black h-full-screen-80px flex items-center justify-center mt-20">
      <div className="flex gap-5 items-center">
        <h2 className="text-primary font-medium text-2xl">404</h2>
        <span className="h-[49px] w-[1px] bg-rgba(255,255,255,.3)"></span>
        <p className="text-primary font-normal text-sm">
          This page could not be found
        </p>
      </div>
    </div>
  );
}

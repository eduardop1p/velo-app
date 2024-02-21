import { FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function PrevUrl({
  url1,
  url2,
  currentPage,
  color,
  fill,
  firstIcon,
}: {
  url1?: {
    url: string;
    name: string;
  };
  url2?: {
    url: string;
    name: string;
  };
  currentPage: string;
  color: string;
  fill: string;
  firstIcon?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1">
      {firstIcon && (
        <div
          className={`${fill} w-4 h-4 flex justify-center items-center mb-[4px]`}
        >
          {firstIcon}
        </div>
      )}
      {url1 && (
        <Link
          href={url1.url}
          className={`${color} text-sm font-normal leading-none`}
        >
          {url1.name}
        </Link>
      )}
      <div className={`${fill} w-3 h-3 flex justify-center items-center  `}>
        <FaChevronRight />
      </div>
      {url2 && (
        <>
          <Link
            href={url2.url}
            className={`${color} text-sm font-normal leading-none`}
          >
            {url2.name}
          </Link>
          <div className={`${fill} w-3 h-3 flex justify-center items-center  `}>
            <FaChevronRight />
          </div>
        </>
      )}
      <span className={`${color} text-sm font-normal leading-none`}>
        {currentPage}
      </span>
    </div>
  );
}

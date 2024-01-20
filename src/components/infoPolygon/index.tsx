'use client';

import { ReactNode } from 'react';

export default function InfoPolygon({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-7 -left-2 bg-primary p-2 rounded ">
      <div
        style={{
          transform:
            'translateX(-1.2rem) translateY(-1.2rem) scaleX(0.5) rotate(-45deg)',
        }}
        className="absolute bg-primary z-[1] w-6 h-4 -bottom-[22px] left-[25px]"
      ></div>
      <p className="text-[11px] z-[2] relative font-normal text-black w-[300px]">
        {children}
      </p>
    </div>
  );
}

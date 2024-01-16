'use client';

import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface RealTimePriceCryptoType {
  prev: number;
  current: number;
}
export interface ContextStateType {
  realTimePriceCrypto: RealTimePriceCryptoType;
  setRealTimePriceCrypto: Dispatch<SetStateAction<RealTimePriceCryptoType>>;
}

export const Context = createContext({});

export default function RealTimePriceCryptoContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [realTimePriceCrypto, setRealTimePriceCrypto] = useState({
    prev: 0,
    current: 0,
  });

  return (
    <Context.Provider value={{ realTimePriceCrypto, setRealTimePriceCrypto }}>
      {children}
    </Context.Provider>
  );
}

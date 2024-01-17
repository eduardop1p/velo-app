'use client';

import { useContext, useEffect, useState } from 'react';

import {
  Context,
  ContextStateType,
  RealTimePriceCryptoType,
} from '../context/realTimePriceCryptoContext';

interface Props {
  symbol: string;
}

export default function useWebSocketCryptoPrice({
  symbol,
}: Props): RealTimePriceCryptoType {
  const { setRealTimePriceCrypto } = useContext(Context) as ContextStateType;

  const [cryptoPrice, setCryptoPrice] = useState({
    prev: 0,
    current: 0,
  });

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);

    ws.onopen = () => {
      const subRequest = {
        action: 'SubAdd',
        subs: [`5~CCCAGG~${symbol}~USD`],
      };

      ws.send(JSON.stringify(subRequest));
    };

    ws.onmessage = event => {
      const jsonData = JSON.parse(event.data);
      const price = jsonData.PRICE;
      if (!price) return;
      setCryptoPrice(state => ({
        current: +price.toFixed(2),
        prev: state.current,
      }));
    };

    ws.onerror = (error: any) => {
      if (!error) return;
      console.error(error.message);
    };

    return () => {
      ws.close();
      setRealTimePriceCrypto({
        current: 0,
        prev: 0,
      });
    };
  }, [symbol, setRealTimePriceCrypto]);

  return {
    current: cryptoPrice.current,
    prev: cryptoPrice.prev,
  };
}

'use client';

import { useEffect, useState } from 'react';

interface Props {
  symbol: string;
}

export default function useWebSocketCryptoPrice({ symbol }: Props): {
  cryptoPrice: {
    prev: number;
    current: number;
  };
} {
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
      setCryptoPrice(state => ({
        current: price ? +price.toFixed(2) : state.prev,
        prev: state.current,
      }));
    };

    ws.onerror = (error: any) => {
      if (!error) return;
      console.error(error.message);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return { cryptoPrice };
}

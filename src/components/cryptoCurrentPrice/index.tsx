'use client';

import useWebSocketCryptoPrice from '@/utils/useWebSocketCryptoPrice';

export default function CryptoCurrentPrice({
  cryptoSymbol,
  cryptoName, // eslint-disable-line
}: {
  cryptoSymbol: string;
  cryptoName: string;
}) {
  const { cryptoPrice } = useWebSocketCryptoPrice({ symbol: cryptoSymbol });

  const handleFormatPrice = (value: number) => {
    if (!value) return;
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleColorPrice = () => {
    if (cryptoPrice.current === cryptoPrice.prev) return 'text-primary-2';
    return cryptoPrice.current > cryptoPrice.prev
      ? 'text-blue'
      : 'text-red-600';
  };

  return (
    // eslint-disable-next-line
    <div className={`flex gap-1 items-center ${cryptoPrice.current ? 'visible' : 'invisible'}`}>
      <h3 className="text-primary font-normal text-base">Current price:</h3>
      {/* eslint-disable-next-line */}
      <span className={`text-[15px] font-normal ${handleColorPrice()}`}>
        {handleFormatPrice(cryptoPrice.current)}
      </span>
    </div>
  );
}

import { CryptoType } from '@/components/header';
import formatDataCrypto from './formatDataCrypto';

export default async function fetchGetFollowMarketCryptos() {
  const resCryptos = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,USDT,ETH,SOL,XRP,DOGE,ADA,LINK,UNI,XLM`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptos.json();
  const dataCryptos: CryptoType[] = formatDataCrypto(
    'follow-market',
    metaData.RAW
  );
  return dataCryptos;
}

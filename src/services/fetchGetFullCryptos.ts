import { CryptoType } from '@/components/header';
import formatDataCrypto from './formtaDataCrypto';

export default async function fetchGetFullCryptos() {
  const resCryptos = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,XRP,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptos.json();
  const dataCryptos: CryptoType[] = formatDataCrypto('full-data', metaData.RAW);
  return dataCryptos;
}

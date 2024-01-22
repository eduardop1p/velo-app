interface Params {
  amountWithdrawalCrypto: number;
  amountWithdrawalDollar: number;
  amountSendCryptoKucoin: number;
  walletAddress: string;
  authorization: string;
  cryptoName: string;
  cryptoSymbol: string;
}

export default async function fetchUserSendCrypto({
  amountWithdrawalCrypto,
  amountWithdrawalDollar,
  walletAddress,
  amountSendCryptoKucoin,
  authorization,
  cryptoName,
  cryptoSymbol,
}: Params) {
  const body = {
    amountWithdrawalCrypto,
    amountWithdrawalDollar,
    amountSendCryptoKucoin,
    walletAddress,
    cryptoName,
    cryptoSymbol,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/withdrawal-user`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  );
  return res;
}

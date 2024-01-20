interface Params {
  amountWithdrawalCrypto: number;
  amountWithdrawalDollar: number;
  amountSendCryptoKucoin: number;
  userCryptoBalance: number;
  authorization: string;
  cryptoName: string;
}

export default async function fetchUserSendCrypto({
  amountWithdrawalCrypto,
  amountWithdrawalDollar,
  amountSendCryptoKucoin,
  userCryptoBalance,
  authorization,
  cryptoName,
}: Params) {
  const body = {
    amountWithdrawalCrypto,
    amountWithdrawalDollar,
    amountSendCryptoKucoin,
    userCryptoBalance,
    cryptoName,
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

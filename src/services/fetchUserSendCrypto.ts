interface Params {
  amountWithdrawalCrypto: number;
  amountWithdrawalDollar: number;
  amountSendCryptoKucoin: number;
  walletAddress: string;
  userCryptoBalance: number;
  authorization: string;
  cryptoName: string;
}

export default async function fetchUserSendCrypto({
  amountWithdrawalCrypto,
  amountWithdrawalDollar,
  walletAddress,
  amountSendCryptoKucoin,
  userCryptoBalance,
  authorization,
  cryptoName,
}: Params) {
  const body = {
    amountWithdrawalCrypto,
    amountWithdrawalDollar,
    amountSendCryptoKucoin,
    walletAddress,
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

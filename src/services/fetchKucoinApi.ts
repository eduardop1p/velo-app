import crypto from 'crypto';

interface Params {
  apiEndpoint: string;
  apiMethod: string;
  apiQueryString?: string;
}

export default async function fetchKucoinApi({
  apiEndpoint,
  apiMethod,
  apiQueryString = '',
}: Params) {
  const apiSecret = process.env.KUCOIN_API_SECRET as string;
  const apiKey = process.env.KUCOIN_API_KEY as string;
  const timestamp = Date.now();
  const endpoint = apiEndpoint;
  const method = apiMethod;
  const queryString = apiQueryString;

  const payload = timestamp + method + endpoint + queryString;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(payload)
    .digest('base64');

  const headers = {
    'KC-API-KEY': apiKey,
    'KC-API-SIGN': signature,
    'KC-API-TIMESTAMP': timestamp.toString(),
    'KC-API-PASSPHRASE': process.env.KUCOIN_API_PASSPHRASE as string,
    'Content-Type': 'application/json',
  };

  const resWithdrawalsQuotas = await fetch(
    `${process.env.KUCOIN_API_BASE_URL}${apiEndpoint}${apiQueryString}`,
    {
      method: apiMethod,
      cache: 'no-cache',
      headers,
    }
  );
  const dataWithdrawalsQuotas = await resWithdrawalsQuotas.json();
  return dataWithdrawalsQuotas.data;
}

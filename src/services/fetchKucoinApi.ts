import crypto from 'crypto';
import { has } from 'lodash';

interface Params {
  apiEndpoint: string;
  apiMethod: string;
  apiQueryString: string;
  body?: Record<string, any>;
}

export default async function fetchKucoinApi({
  apiEndpoint,
  apiMethod,
  apiQueryString,
  body,
}: Params) {
  const apiSecret = process.env.KUCOIN_API_SECRET as string;
  const apiKey = process.env.KUCOIN_API_KEY as string;
  const timestamp = Date.now();
  const endpoint = apiEndpoint;
  const method = apiMethod;
  const params = body ? JSON.stringify(body) : apiQueryString;

  const payload = timestamp + method + endpoint + params;
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

  const res = await fetch(
    `${process.env.KUCOIN_API_BASE_URL}${apiEndpoint}${apiQueryString}`,
    {
      method: apiMethod,
      cache: 'no-cache',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }
  );
  const metaData = await res.json();
  if (has(metaData, 'msg') && +metaData.code > 200000) {
    return {
      dataKucoin: null,
      errKucoin: {
        msg: metaData.msg,
        code: +metaData.code,
      },
    };
  }

  return {
    dataKucoin: metaData.data,
    errKucoin: null,
  };
}

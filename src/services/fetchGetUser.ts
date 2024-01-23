import type { ShowUserType } from '@/components/header';

export default async function fetchGetUser(token: string) {
  const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  const userData: ShowUserType = await resUser.json();
  return userData;
}

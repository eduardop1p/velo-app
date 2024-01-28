import { ActiveType } from '@/app/api/models/users';

export default function calInvested(active: ActiveType[]) {
  const totalInvested = active.reduce(
    (prev, active) => prev + active.valueInvestedProfit,
    0
  );

  return totalInvested;
}

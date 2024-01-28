import { ActiveType, VeliabilitiesType } from '@/app/api/models/users';

export default function calcPatrimonyTotal(
  active: ActiveType[],
  veliabilities: VeliabilitiesType[],
  balance: number
) {
  const activeTotal =
    active.reduce((pv, active) => pv + active.valueInvestedProfit, 0) + balance;
  const veliabilitiesTotal = veliabilities.reduce(
    (pv, veliabilities) => pv + veliabilities?.value,
    0
  );

  return activeTotal - veliabilitiesTotal;
}

import { ActiveVeliabilitiesType } from '@/app/api/models/users';

export default function calcPatrimonyTotal(
  active: ActiveVeliabilitiesType[],
  veliabilities: ActiveVeliabilitiesType[],
  balance: number
) {
  const activeTotal =
    active.reduce((pv, active) => pv + active?.valueInvested, 0) + balance;
  const veliabilitiesTotal = veliabilities.reduce(
    (pv, veliabilities) => pv + veliabilities?.valueInvested,
    0
  );

  return activeTotal - veliabilitiesTotal;
}

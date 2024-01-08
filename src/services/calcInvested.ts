import { ActiveVeliabilitiesType } from '@/app/api/models/users';

export default function calInvested(active: ActiveVeliabilitiesType[]) {
  const totalInvested = active.reduce(
    (prev, active) => prev + active?.valueInvested,
    0
  );

  return totalInvested;
}

import { ActiveType } from '@/app/api/models/users';
import formatPrice from './formatPrice';

export default function getInvestedProfit(active: ActiveType[]) {
  const totalInvested = active.reduce(
    (prev, val) => prev + val.valueInvested,
    0
  );
  const totalProfit = active.reduce((prev, val) => prev + val.valueProfit, 0);
  const percent =
    ((totalInvested + totalProfit - totalInvested) / totalInvested) * 100;
  if (totalProfit === 0) {
    return {
      value: `${formatPrice(totalProfit)} (0%)`,
      color: 'text-999',
    };
  }
  if (totalProfit > 0) {
    return {
      value: `+ ${formatPrice(totalProfit)} (${percent.toFixed(2)}%)`,
      color: 'text-blue',
    };
  }
  return {
    value: `- ${formatPrice(totalProfit).replace('-', '')} (${percent
      .toFixed(2)
      .replace('-', '')}%)`,
    color: 'text-red-graphic',
  };
}

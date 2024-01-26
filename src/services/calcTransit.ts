import { TransactionsType } from '@/app/api/models/users';

export default function calTransit(transactions: TransactionsType[]) {
  const totalTransit = transactions.reduce((prev, transactions) => {
    if (transactions?.status === 'pending') {
      return prev + transactions?.dollarValue;
    }
    return prev;
  }, 0);

  return totalTransit;
}

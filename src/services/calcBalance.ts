import { TransactionsType } from '@/app/api/models/users';

export default function calBalance(transactions: TransactionsType[]) {
  const balance = transactions.reduce(
    (prev, transaction) => prev + (transaction.dollarValue || 0),
    0
  );

  return balance;
}

export type MinDepositType =
  | '$'
  | '€'
  | '£'
  | '¥'
  | 'CHF'
  | 'R$'
  | '₹'
  | 'Rp'
  | '₦';

const minimumDeposit = (symbol: MinDepositType, value: number) => ({
  symbol,
  value,
}); // o padrão 2000

export default minimumDeposit;

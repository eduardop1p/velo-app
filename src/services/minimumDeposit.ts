export type MinDepositType = '$' | '€' | '£' | '¥' | 'CHF' | 'R$' | '₹';

const minimumDeposit = (symbol: MinDepositType, value: number) => ({
  symbol,
  value,
}); // o padrão 2000

export default minimumDeposit;

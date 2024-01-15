export default function replaceCurrency(value: string): number {
  return +value.replace(/[$+,]/g, '');
}

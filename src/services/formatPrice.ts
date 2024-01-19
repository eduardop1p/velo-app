export default function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

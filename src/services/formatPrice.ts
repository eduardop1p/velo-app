export default function formatPrice(
  value: number | string,
  currency = 'USD',
  location = 'en-US'
) {
  return value.toLocaleString(location, {
    style: 'currency',
    currency,
  });
}

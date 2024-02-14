export default function formatLastComma(value: string) {
  const lastStringFind = value.lastIndexOf(',');
  return `${value.slice(0, lastStringFind)} and ${value.slice(
    lastStringFind + 1
  )}`;
}

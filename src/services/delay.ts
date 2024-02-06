export default async function delay(ms: number) {
  // eslint-disable-next-line
  return new Promise((rs, rj) => {
    setTimeout(() => {
      rs('success');
    }, ms);
  });
}

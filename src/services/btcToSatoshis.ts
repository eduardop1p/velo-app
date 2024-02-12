export default function btcToSatoshis(value: number) {
  return Math.round(value * 100000000); // 1 BTC = 100,000,000 satoshis
}

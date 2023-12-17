export default function LogoTitle({
  fontSize,
  color,
}: {
  fontSize: string;
  color: string;
}) {
  return <h1 className={`${fontSize} font-bold ${color}`}>velo</h1>;
}

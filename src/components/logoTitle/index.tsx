import Link from 'next/link';

export default function LogoTitle({
  fontSize,
  color,
  font = 'font-bold',
}: {
  fontSize: string;
  color: string;
  font?: string;
}) {
  return (
    <Link href="/" className={`${fontSize} ${font} ${color}`}>
      velo
    </Link>
  );
}

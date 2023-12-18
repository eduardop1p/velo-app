import Link from 'next/link';

export default function LogoTitle({
  fontSize,
  color,
}: {
  fontSize: string;
  color: string;
}) {
  return (
    <Link href="/" className={`${fontSize} font-bold ${color}`}>
      velo
    </Link>
  );
}

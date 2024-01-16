export default function FormErrorMsg({
  msg,
  fontSize = 'text-[10px]',
}: {
  msg: string;
  fontSize?: string;
}) {
  return <span className={`text-red-600 ${fontSize} font-normal`}>{msg}</span>;
}

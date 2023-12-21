export default function FormErrorMsg({ msg }: { msg: string }) {
  return (
    <span className="text-red-graphic text-[10px] font-normal">{msg}</span>
  );
}

import Link from 'next/link';

export default function NewInVelo({
  title,
  description,
  btnText,
  url,
}: {
  title: string;
  description: string;
  btnText: string;
  url: string;
}) {
  return (
    <div className="p-6 h-56 border-1 border-solid border-rgba-0-0-0-1 bg-primary rounded flex flex-col justify-between">
      <div>
        <h3 className="text-black font-normal text-base border-b-1 border-rgba-0-0-0-1 border-solid pb-2">
          {title}
        </h3>
        <p className="mt-4 text-gray-000000b3 font-normal text-[13px]">
          {description}
        </p>
      </div>
      <Link
        href={url}
        className="text-[13px] text-black font-normal px-4 py-2 border-1 border-blue border-solid rounded w-fit"
      >
        {btnText}
      </Link>
    </div>
  );
}

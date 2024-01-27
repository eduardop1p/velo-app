import SkeletonUi from '@/components/skeletonUI';

export default function SkeletonUserPatrimony() {
  return (
    <section className="w-full p-7 rounded-lg flex justify-between h-[250px]">
      <div className="w-1/2 flex flex-col justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="flex flex-col gap-2">
            <SkeletonUi width={80} height={20} />
            <SkeletonUi width={72} height={50} />
          </div>
          <SkeletonUi width={20} height={20} />
        </div>
        <SkeletonUi width="100%" height={1} />
        <SkeletonUi width={107} height={20} />
      </div>
      <SkeletonUi width={0.8} height="100%" />
    </section>
  );
}

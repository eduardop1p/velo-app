import SkeletonUi from '@/components/skeletonUI';

export default function SkeletonWalletGraphic() {
  return (
    <div className="w-full flex gap-10 items-center">
      <div className="w-[250px] h-[250px] border-[19px] border-solid border-[#212121] rounded-full flex flex-col gap-2 items-center justify-center animate-pulse">
        <SkeletonUi width={61} height={32} />
        <SkeletonUi width={97} height={20} />
      </div>
      <div className="flex flex-col gap-6 w-[300px]">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex flex-col gap-2">
            <SkeletonUi width={50} height={19} />
            <SkeletonUi width={97} height={35} />
          </div>
          <SkeletonUi width={24} height={24} borderRadius="8px" />
        </div>
        <SkeletonUi width="100%" height={2} />
        <div className="flex flex-col gap-2">
          <SkeletonUi width={120} height={19} />
          <SkeletonUi width={80} height={19} />
        </div>
      </div>
    </div>
  );
}

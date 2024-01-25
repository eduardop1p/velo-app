import SkeletonUi from '@/components/skeletonUI';

export default function SkeletonFormSendCrypto() {
  return (
    <div className="flex flex-col gap-4 w-2/3">
      <div className="flex gap-8 w-full">
        <SkeletonUi width="50%" height={71} />
        <SkeletonUi width="50%" height={71} />
      </div>
      <div className="flex gap-8 w-full">
        <SkeletonUi width="50%" height={43} />
        <SkeletonUi width="50%" height={43} />
      </div>
      <div className="flex flex-col gap-8 mt-4 w-full">
        <div className="flex gap-8 w-full">
          <SkeletonUi width="50%" height={69} />
          <SkeletonUi width="50%" height={69} />
        </div>
        <div className="flex gap-8 w-full">
          <SkeletonUi width="50%" height={43} />
          <SkeletonUi width="50%" height={43} />
        </div>
        <div className="flex gap-4 self-start">
          <SkeletonUi width={135} height={45} />
          <SkeletonUi width={135} height={45} />
        </div>
        <SkeletonUi width="100%" height={68} />
      </div>
    </div>
  );
}

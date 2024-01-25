import SkeletonUi from '@/components/skeletonUI';

export default function SkeletonFormCreatedAccount() {
  return (
    <div className="flex flex-col gap-5 w-3/5 mt-5">
      <SkeletonUi bgColor="#DDDBDD" width="40%" height={36} />
      <SkeletonUi bgColor="#DDDBDD" width="50%" height={28} />
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center w-full gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2 w-full">
            <SkeletonUi bgColor="#DDDBDD" width="10%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
              <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <SkeletonUi bgColor="#DDDBDD" width="40%" height={22} />
              <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
            </div>
          </div>
          <SkeletonUi bgColor="#DDDBDD" width="50%" height={117} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <SkeletonUi bgColor="#DDDBDD" width="50%" height={20} />
          <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
        </div>
      </div>
    </div>
  );
}

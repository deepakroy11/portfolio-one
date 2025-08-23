import { Skeleton } from "@heroui/react";

const MetaDataSkelton = () => {
  return (
    <>
      <div className="w-full flex items-center gap-3">
        <div className="w-full flex flex-row gap-2">
          <Skeleton className="w-10 rounded-lg">
            <div className="h-3 w-10 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-15 rounded-lg">
            <div className="h-3 w-15 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-10 rounded-lg">
            <div className="h-3 w-10 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-20 rounded-lg">
            <div className="h-3 w-20 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        <div className="w-full flex flex-row gap-2">
          <Skeleton className="w-20 rounded-lg">
            <div className="h-3 w-20 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-15 rounded-lg">
            <div className="h-3 w-15 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-10 rounded-lg">
            <div className="h-3 w-10 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>

      <div className="w-full flex items-center gap-3">
        <div className="w-full flex flex-row gap-2">
          <Skeleton className="w-10 rounded-lg">
            <div className="h-3 w-10 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-10 rounded-lg">
            <div className="h-3 w-10 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-15 rounded-lg">
            <div className="h-3 w-15 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default MetaDataSkelton;

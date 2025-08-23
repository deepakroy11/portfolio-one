import { Card, Skeleton } from "@heroui/react";

const PostSkelton = () => {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <div className="w-full flex items-center gap-3">
        <div>
          <Skeleton className="w-[200px] rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="w-full flex flex-row gap-2">
            <Skeleton className="w-15 rounded-lg">
              <div className="h-3 w-15 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-15 rounded-lg">
              <div className="h-3 w-15 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="w-full flex flex-row gap-2">
            <Skeleton className="w-10 rounded-lg">
              <div className="h-3 w-10 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-10 rounded-lg">
              <div className="h-3 w-10 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-10 rounded-lg">
              <div className="h-3 w-10 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-10 rounded-lg">
              <div className="h-3 w-10 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostSkelton;

import { Card, Skeleton } from "@heroui/react";

const PostDetailSkelton = () => {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="w-full rounded-lg">
        <div className="h-48 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>
      <div className="w-full flex flex-row gap-2">
        <Skeleton className="w-10 rounded-lg">
          <div className="h-3 w-10 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-10 rounded-lg">
          <div className="h-3 w-10 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      </Skeleton>
    </Card>
  );
};

export default PostDetailSkelton;

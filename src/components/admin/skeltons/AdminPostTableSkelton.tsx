import { Skeleton } from "@heroui/react";

export default function AdminPostTableSkeleton() {
  return (
    <div className="flex-1 p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/4 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      {/* Table Header */}
      <div className="flex gap-4 p-4 border-b">
        <Skeleton className="h-4 w-1/4 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
      </div>

      {/* Table Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b">
          <Skeleton className="h-4 w-1/4 rounded" />
          <Skeleton className="h-4 w-1/6 rounded" />
          <Skeleton className="h-4 w-1/6 rounded" />
          <Skeleton className="h-4 w-1/6 rounded" />
          <Skeleton className="h-4 w-1/6 rounded" />
        </div>
      ))}
    </div>
  );
}
import { Skeleton } from '@nextui-org/react';

export function UsersListSkeleton() {
  return (
    <div className="flex flex-col w-screen">
      <Skeleton className="w-1/3 h-8 rounded-md mb-4">
        <div className="bg-default-300"></div>
      </Skeleton>
      <Skeleton className="w-3/4 h-60 rounded-md">
        <div className="bg-default-300"></div>
      </Skeleton>
    </div>
  );
}

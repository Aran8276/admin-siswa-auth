"use client";

import { Card, Skeleton } from "@nextui-org/react";

export default function TableLoading() {
  return (
    <Card
      className="w-[32rem] bg-[#020817] h-[30rem] p-4 flex flex-col"
      radius="lg"
    >
      <div className="flex space-x-16 mb-">
        <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
      </div>
      <div className="flex flex-col space-y-12">
        <div className="flex space-x-16 mt-12">
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        </div>
        <div className="flex space-x-16 mt-12">
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        </div>
        <div className="flex space-x-16 mt-12">
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        </div>
        <div className="flex space-x-16 mt-12">
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        </div>
        <div className="flex space-x-16 mt-12">
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-32 h-5 rounded-lg"></Skeleton>
        </div>
      </div>
    </Card>
  );
}

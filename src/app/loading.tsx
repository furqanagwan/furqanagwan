import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto animate-pulse">
      {/* Title skeleton */}
      <div className="text-center mb-10">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

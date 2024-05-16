import { Skeleton } from "~/components/ui/skeleton";

export default function IdeaEssenceLoader() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
      <div className="p-6 md:p-8 lg:p-10">
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-4/5 rounded-md" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

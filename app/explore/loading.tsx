import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function ExploreLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Skeleton for sidebar */}
      <div className="hidden md:block md:w-64 border-r">
        <div className="p-4">
          <Skeleton className="h-8 w-28 rounded-md mb-8" />
          <div className="space-y-4">
            {Array(7).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-10 w-full max-w-md rounded-full" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full p-4">
          <Skeleton className="h-10 w-full mb-6 rounded-md" />
          
          <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-md flex-shrink-0" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {Array(9).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Nav Skeleton */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2">
        <div className="flex justify-around">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
} 
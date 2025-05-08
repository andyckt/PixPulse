import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function ConversationLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-3 border-b flex items-center justify-between sticky top-0 bg-background z-10">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full md:hidden" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-2 max-w-[60%]">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>

            <div className="flex items-start gap-2 max-w-[60%] ml-auto flex-row-reverse">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="flex items-start gap-2 max-w-[60%]">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>

            <div className="flex items-start gap-2 max-w-[60%] ml-auto flex-row-reverse">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
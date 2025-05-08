import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function MessagesLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b sticky top-0 z-10 backdrop-blur-md bg-background/90">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)]">
              <div className="p-2">
                <div className="space-y-2 mt-1">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-8" />
                        </div>
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col h-full">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
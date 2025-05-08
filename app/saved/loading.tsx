import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, GridIcon, ListFilter } from "lucide-react"

export default function SavedPageLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/90 p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
            <Skeleton className="h-10 w-full max-w-md" />
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="opacity-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <div className="flex items-center rounded-md border overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="rounded-none border-r h-9 px-2.5 opacity-50"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="rounded-none h-9 px-2.5 opacity-50"
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <ScrollArea className="pb-2 -mx-4 px-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-full" />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="max-w-6xl mx-auto w-full p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function FriendsLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar - Static as it doesn't need to load */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b">
          <Skeleton className="h-8 w-48 mb-2" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full p-4">
          <Skeleton className="h-12 w-full mb-6" />
          
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Static as it doesn't need to load */}
      <MobileNav />
    </div>
  )
}


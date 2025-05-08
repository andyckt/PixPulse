import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SnowflakeIcon as Crystal, RefreshCw } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function CrystalBallPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Crystal Ball</h1>
        </div>
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto w-full p-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-8">
                <Crystal className="h-24 w-24 mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">
                  Ask a question and the crystal ball will reveal your future
                </p>
              </div>

              <Card className="w-full max-w-md mb-8">
                <CardContent className="p-6">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full bg-black/80 flex items-center justify-center">
                      <p className="text-white font-medium text-center px-4">Ask again later</p>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Ask Another Question
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4 w-full max-w-md">
                <h2 className="text-xl font-semibold">Previous Predictions</h2>
                <div className="space-y-2">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Question:</p>
                      <p className="font-medium">Will I find success in my new project?</p>
                      <p className="text-sm text-muted-foreground mt-2">Answer:</p>
                      <p className="font-medium text-primary">Signs point to yes</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Question:</p>
                      <p className="font-medium">Should I take that trip next month?</p>
                      <p className="text-sm text-muted-foreground mt-2">Answer:</p>
                      <p className="font-medium text-primary">Without a doubt</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Question:</p>
                      <p className="font-medium">Will I meet someone special soon?</p>
                      <p className="text-sm text-muted-foreground mt-2">Answer:</p>
                      <p className="font-medium text-primary">Outlook not so good</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


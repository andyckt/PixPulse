import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Heart, UserPlus } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-2xl mx-auto w-full p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Activity</h1>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="all">
                <Bell className="h-4 w-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger value="likes">
                <Heart className="h-4 w-4 mr-2" />
                Likes
              </TabsTrigger>
              <TabsTrigger value="follows">
                <UserPlus className="h-4 w-4 mr-2" />
                Follows
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="p-4">
                <h2 className="font-medium mb-4">Today</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">john_doe</span> liked your photo.{" "}
                        <span className="text-muted-foreground">2h</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=SM" alt="Sarah Miller" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">sarah_miller</span> commented: "This is amazing! 😍"{" "}
                        <span className="text-muted-foreground">3h</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=AK" alt="Alex Kim" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">alex_kim</span> started following you.{" "}
                        <span className="text-muted-foreground">5h</span>
                      </p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                </div>

                <h2 className="font-medium mb-4 mt-6">Yesterday</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=RW" alt="Rachel Wong" />
                      <AvatarFallback>RW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">rachel_wong</span> liked your photo.{" "}
                        <span className="text-muted-foreground">1d</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=TP" alt="Tom Parker" />
                      <AvatarFallback>TP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">tom_parker</span> mentioned you in a comment.{" "}
                        <span className="text-muted-foreground">1d</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>
                </div>

                <h2 className="font-medium mb-4 mt-6">This Week</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=EL" alt="Emma Lee" />
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">emma_lee</span> and <span className="font-medium">5 others</span>{" "}
                        liked your photo. <span className="text-muted-foreground">3d</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="likes">
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">john_doe</span> liked your photo.{" "}
                        <span className="text-muted-foreground">2h</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=RW" alt="Rachel Wong" />
                      <AvatarFallback>RW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">rachel_wong</span> liked your photo.{" "}
                        <span className="text-muted-foreground">1d</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=EL" alt="Emma Lee" />
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">emma_lee</span> and <span className="font-medium">5 others</span>{" "}
                        liked your photo. <span className="text-muted-foreground">3d</span>
                      </p>
                    </div>
                    <div className="h-12 w-12 relative">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Post" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="follows">
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=AK" alt="Alex Kim" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">alex_kim</span> started following you.{" "}
                        <span className="text-muted-foreground">5h</span>
                      </p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=MJ" alt="Mike Johnson" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">mike_johnson</span> started following you.{" "}
                        <span className="text-muted-foreground">2d</span>
                      </p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=CS" alt="Chris Smith" />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">chris_smith</span> started following you.{" "}
                        <span className="text-muted-foreground">4d</span>
                      </p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Grid, Settings, UserPlus } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto w-full p-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <Avatar className="w-24 h-24 md:w-36 md:h-36">
              <AvatarImage src="/placeholder.svg?height=144&width=144" alt="Your profile" />
              <AvatarFallback>YP</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-2xl font-bold">@username</h1>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button>Edit Profile</Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <p className="font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">1.2K</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">567</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>

              <div>
                <p className="font-medium">Your Name</p>
                <p className="text-sm">Bio description goes here. This is where you can share a bit about yourself.</p>
                <p className="text-sm text-blue-500">website.com</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <Tabs defaultValue="posts">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="posts">
                <Grid className="h-5 w-5 mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark className="h-5 w-5 mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="tagged">
                <UserPlus className="h-5 w-5 mr-2" />
                Tagged
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Post+${i + 1}`}
                      alt={`Post ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Saved+${i + 1}`}
                      alt={`Saved ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-6">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Tagged+${i + 1}`}
                      alt={`Tagged ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


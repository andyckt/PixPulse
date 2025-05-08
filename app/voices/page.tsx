import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Compass, Search, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function VoicesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto w-full p-4">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold">Voices</h1>
            <div className="relative flex-1 max-w-md ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="explore">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="explore">
                <Compass className="h-4 w-4 mr-2" />
                Explore
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="suggested">
                <Users className="h-4 w-4 mr-2" />
                Suggested
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explore">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <Link href="#" key={i} className="aspect-square relative group">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Explore+${i + 1}`}
                      alt={`Explore ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="text-center">
                        <p className="font-medium">1.2k</p>
                        <p className="text-xs">likes</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-4">Trending Topics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={`/placeholder.svg?height=200&width=400&text=Trending+${i + 1}`}
                          alt={`Trending ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">#{["summer", "photography", "travel", "food"][i]}</h3>
                        <p className="text-sm text-muted-foreground">{["10.2k", "8.5k", "7.1k", "5.9k"][i]} posts</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="suggested">
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-4">Suggested for You</h2>

                <div className="grid gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=User+${i + 1}`}
                            alt={`User ${i + 1}`}
                          />
                          <AvatarFallback>{["JD", "SM", "AK", "RW", "TP"][i]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {["john_doe", "sarah_miller", "alex_kim", "rachel_wong", "tom_parker"][i]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Followed by {["emma", "mike", "lisa", "david", "kate"][i]} + {[3, 5, 2, 7, 4][i]} more
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
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


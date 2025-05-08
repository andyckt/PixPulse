import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Users } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function FriendsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>
        <div className="max-w-4xl mx-auto w-full p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search friends" className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="following">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="following">
                <Users className="h-4 w-4 mr-2" />
                Following
              </TabsTrigger>
              <TabsTrigger value="suggestions">
                <UserPlus className="h-4 w-4 mr-2" />
                Suggestions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="following">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=User+${i + 1}`}
                            alt={`User ${i + 1}`}
                          />
                          <AvatarFallback>{["JD", "SM", "AK", "RW", "TP", "EL", "MJ", "CS"][i]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {
                              [
                                "john_doe",
                                "sarah_miller",
                                "alex_kim",
                                "rachel_wong",
                                "tom_parker",
                                "emma_lee",
                                "mike_johnson",
                                "chris_smith",
                              ][i]
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {
                              [
                                "John Doe",
                                "Sarah Miller",
                                "Alex Kim",
                                "Rachel Wong",
                                "Tom Parker",
                                "Emma Lee",
                                "Mike Johnson",
                                "Chris Smith",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Unfollow
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions">
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-4">People You May Know</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=Sugg+${i + 1}`}
                              alt={`Suggestion ${i + 1}`}
                            />
                            <AvatarFallback>{["LW", "BT", "JC", "KM", "DP", "AN"][i]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {
                                [
                                  "lisa_white",
                                  "ben_taylor",
                                  "jessica_chen",
                                  "kevin_martin",
                                  "diana_patel",
                                  "adam_nguyen",
                                ][i]
                              }
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Followed by {["john", "sarah", "alex", "rachel", "tom", "emma"][i]} +{" "}
                              {[2, 4, 1, 3, 5, 2][i]} more
                            </p>
                          </div>
                        </div>
                        <Button size="sm">Follow</Button>
                      </CardContent>
                    </Card>
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


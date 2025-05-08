"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  Filter, 
  Search, 
  UserCheck, 
  UserPlus, 
  Users
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FriendListItem } from "@/components/friend-list-item"
import { FriendSuggestionItem } from "@/components/friend-suggestion-item"
import { FriendRequestItem } from "@/components/friend-request-item"

export default function FriendsPage() {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null)
  
  // Sample friends data with enhanced information
  const friends = [
    {
      id: "user1",
      username: "emily_travels",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 15,
      lastActive: "2h ago",
      status: "Exploring Tokyo right now! 🇯🇵",
      interactionLevel: "high",
      tags: ["travel", "photography", "food"],
      isCloseFriend: true,
      online: true
    },
    {
      id: "user2",
      username: "mark_photos",
      name: "Mark Wilson",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 8,
      lastActive: "5h ago",
      status: "Check out my new photo series!",
      interactionLevel: "medium",
      tags: ["photography", "nature", "hiking"],
      isCloseFriend: false,
      online: true
    },
    {
      id: "user3",
      username: "sara_designs",
      name: "Sara Miller",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 23,
      lastActive: "1d ago",
      status: "Working on new UI designs",
      interactionLevel: "high",
      tags: ["design", "art", "tech"],
      isCloseFriend: true,
      online: false
    },
    {
      id: "user4",
      username: "alex_kim",
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 5,
      lastActive: "2d ago",
      status: "",
      interactionLevel: "low",
      tags: ["music", "concerts", "nightlife"],
      isCloseFriend: false,
      online: false
    },
    {
      id: "user5",
      username: "rachel_wong",
      name: "Rachel Wong",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 12,
      lastActive: "3h ago",
      status: "Happy birthday to me! 🎂",
      interactionLevel: "medium",
      tags: ["fashion", "beauty", "lifestyle"],
      isCloseFriend: false,
      online: true
    },
    {
      id: "user6",
      username: "mike_fitness",
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 3,
      lastActive: "Just now",
      status: "New personal record! 💪",
      interactionLevel: "medium",
      tags: ["fitness", "health", "nutrition"],
      isCloseFriend: false,
      online: true
    },
    {
      id: "user7",
      username: "emma_chef",
      name: "Emma Lee",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 7,
      lastActive: "1w ago",
      status: "",
      interactionLevel: "low",
      tags: ["cooking", "food", "recipes"],
      isCloseFriend: false,
      online: false
    },
    {
      id: "user8",
      username: "tom_tech",
      name: "Tom Parker",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 19,
      lastActive: "3d ago",
      status: "Just launched my new app!",
      interactionLevel: "medium",
      tags: ["tech", "programming", "startups"],
      isCloseFriend: true,
      online: false
    }
  ]
  
  // Sample suggested friends with reasons for suggestion
  const suggestions = [
    {
      id: "sugg1",
      username: "lisa_artist",
      name: "Lisa White",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 12,
      suggestedReason: "Based on your interest in art and design",
      popularityScore: 95,
      tags: ["art", "painting", "creative"]
    },
    {
      id: "sugg2",
      username: "ben_travels",
      name: "Ben Taylor",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 8,
      suggestedReason: "Friends with Sara Miller and 8 others",
      popularityScore: 82,
      tags: ["travel", "adventure", "photography"]
    },
    {
      id: "sugg3",
      username: "jessica_fashion",
      name: "Jessica Chen",
      avatar: "https://images.unsplash.com/photo-1564460576398-ef55d99548b2?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 5,
      suggestedReason: "Popular in fashion and beauty",
      popularityScore: 97,
      tags: ["fashion", "modeling", "lifestyle"]
    },
    {
      id: "sugg4",
      username: "kevin_music",
      name: "Kevin Martin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 3,
      suggestedReason: "Shares your interest in music",
      popularityScore: 78,
      tags: ["music", "guitar", "bands"]
    },
    {
      id: "sugg5",
      username: "diana_chef",
      name: "Diana Patel",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop",
      isVerified: false,
      mutualFriends: 7,
      suggestedReason: "You might know Diana from Emma Lee",
      popularityScore: 85,
      tags: ["cooking", "baking", "food"]
    },
    {
      id: "sugg6",
      username: "adam_tech",
      name: "Adam Nguyen",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop",
      isVerified: true,
      mutualFriends: 15,
      suggestedReason: "Works at TechCorp with Tom Parker",
      popularityScore: 93,
      tags: ["tech", "AI", "programming"]
    }
  ]
  
  // Sample pending requests
  const pendingRequests = [
    {
      id: "req1",
      username: "olivia_creative",
      name: "Olivia Green",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
      requestedAt: "2d ago",
      mutualFriends: 4
    },
    {
      id: "req2",
      username: "james_photo",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop",
      requestedAt: "1w ago",
      mutualFriends: 2
    },
    {
      id: "req3",
      username: "sophia_travels",
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1000&auto=format&fit=crop",
      requestedAt: "2h ago",
      mutualFriends: 7
    }
  ]
  
  const handleOpenProfile = (user: any) => {
    setCurrentUserProfile(user)
  }

  // Toggle filter function
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  // Filtered friends based on search and active filters
  const filteredFriends = friends.filter(friend => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Tag filters
    const matchesTags = activeFilters.length === 0 || 
      activeFilters.some(filter => friend.tags.includes(filter))
    
    return matchesSearch && matchesTags
  })

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/90 p-4 border-b">
          <h1 className="text-2xl font-bold mb-2">Friends</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search friends by name or username" 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-muted" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-3 p-3 border rounded-lg bg-background">
              <p className="text-sm font-medium mb-2">Filter by interest:</p>
              <div className="flex flex-wrap gap-2">
                {["travel", "photography", "music", "art", "design", "tech", "food", "fitness", "fashion"].map(tag => (
                  <Badge 
                    key={tag}
                    variant={activeFilters.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="max-w-4xl mx-auto w-full py-4">
            <Tabs defaultValue="following" className="mb-6">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="following">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Friends
                </TabsTrigger>
                <TabsTrigger value="requests">
                  <Clock className="h-4 w-4 mr-2" />
                  Requests
                  {pendingRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-2">{pendingRequests.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="suggestions">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Suggestions
                </TabsTrigger>
              </TabsList>
              
              {/* Friends Tab */}
              <TabsContent value="following" className="space-y-4">
                {filteredFriends.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No matching friends found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try adjusting your search or filters
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredFriends.map(friend => (
                      <Card key={friend.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <FriendListItem 
                            friend={friend}
                            onProfileOpen={handleOpenProfile}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Requests Tab */}
              <TabsContent value="requests">
                {pendingRequests.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">No pending friend requests</h3>
                      <p className="text-muted-foreground mt-1">
                        When someone sends you a friend request, it will appear here
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map(request => (
                      <Card key={request.id}>
                        <CardContent className="p-0">
                          <FriendRequestItem request={request} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Suggestions Tab */}
              <TabsContent value="suggestions">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">People You May Know</h2>
                    <Button variant="ghost" size="sm">
                      See All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {suggestions.map(suggestion => (
                      <Card key={suggestion.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <FriendSuggestionItem suggestion={suggestion} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>

      {/* User Profile Dialog */}
      {currentUserProfile && (
        <Dialog open={!!currentUserProfile} onOpenChange={() => setCurrentUserProfile(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center p-4">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={currentUserProfile.avatar} alt={currentUserProfile.name} className="object-cover" />
                <AvatarFallback>{currentUserProfile.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{currentUserProfile.name}</h2>
              <p className="text-muted-foreground">@{currentUserProfile.username}</p>
              
              {currentUserProfile.status && (
                <div className="mt-2 text-center text-sm">{currentUserProfile.status}</div>
              )}
              
              <div className="flex gap-6 mt-6">
                <div className="text-center">
                  <p className="font-bold">142</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">1.2K</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{currentUserProfile.mutualFriends}</p>
                  <p className="text-xs text-muted-foreground">Mutuals</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button>Message</Button>
                <Button variant="outline">Visit Profile</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


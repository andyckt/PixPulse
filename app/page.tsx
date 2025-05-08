"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Bookmark, 
  Camera, 
  Cog, 
  Flame, 
  Image as ImageIcon, 
  Mic, 
  Music, 
  Plus, 
  RefreshCw, 
  Search, 
  Send, 
  Sparkles, 
  Sun, 
  Tv2, 
  Upload, 
  Video,
  X
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function Home() {
  // Content categorization state
  const [activeTab, setActiveTab] = useState("for-you")
  const [showPostOptions, setShowPostOptions] = useState(false)
  
  // Story viewing state
  const [viewingStory, setViewingStory] = useState<null | string>(null)
  
  // Sample trending hashtags
  const trendingTags = [
    { tag: "#photography", posts: "23.5K" },
    { tag: "#travel", posts: "18.2K" },
    { tag: "#foodie", posts: "12.7K" },
    { tag: "#music", posts: "9.3K" },
    { tag: "#art", posts: "7.8K" }
  ]
  
  // Sample suggested accounts
  const suggestedAccounts = [
    { id: "user1", name: "Jane Smith", username: "jane_travels", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3", reason: "Popular in travel" },
    { id: "user2", name: "Mark Wilson", username: "mark_photos", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3", reason: "Photographer you might like" },
    { id: "user3", name: "Aria Lee", username: "aria_music", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3", reason: "Musician" }
  ]
  
  // Enhanced sample story data
  const stories = [
    { id: "story1", user: { name: "Your Story", username: "you", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: false, isYourStory: true },
    { id: "story2", user: { name: "Alex Johnson", username: "alex_j", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: true, type: "friend" },
    { id: "story3", user: { name: "Emma Watson", username: "emma_official", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: true, type: "celebrity" },
    { id: "story4", user: { name: "DJ Khaled", username: "djkhaled", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: true, type: "musician" },
    { id: "story5", user: { name: "Jessica Chen", username: "jess_chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: false, type: "friend" },
    { id: "story6", user: { name: "Travelista", username: "travel_mag", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: true, type: "brand" },
    { id: "story7", user: { name: "Food Network", username: "food_net", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" }, hasUnviewed: true, type: "brand" }
  ]
  
  // Enhanced sample post data with more diversity
  const posts = [
    {
      id: "post1",
      author: {
        name: "Alex Johnson",
        username: "alex_j",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "Beautiful day at Malibu Beach! Perfect waves today 🌊 #summer #surfing #california",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "square" as const,
      },
      likes: 324,
      comments: [
        {
          id: "comment1",
          author: {
            name: "Sarah Miller",
            username: "sarah_m",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Looks amazing! Is that north or south Malibu?",
          timestamp: "2h ago",
        },
        {
          id: "comment2",
          author: {
            name: "Mike Johnson",
            username: "mike_j",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Perfect waves! I need to get out there this weekend!",
          timestamp: "1h ago",
        },
      ],
      timestamp: "3h ago",
      location: "Malibu, California",
      saves: 45
    },
    {
      id: "post2",
      author: {
        name: "Emma Watson",
        username: "emma_official",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "Just finished reading this thought-provoking novel! Highly recommend it to everyone who loves psychological thrillers. The character development is incredible. #reading #books #thriller",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "video" as const,
      },
      likes: 15689,
      comments: [
        {
          id: "comment3",
          author: {
            name: "Alex Kim",
            username: "alex_k",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Adding this to my reading list immediately! I loved the author's previous work.",
          timestamp: "45m ago",
        },
        {
          id: "comment4",
          author: {
            name: "BookWorm",
            username: "bookworm",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "I'm halfway through it! That plot twist in chapter 7 was mind-blowing!",
          timestamp: "20m ago",
        },
      ],
      timestamp: "5h ago",
      isLiked: true,
      isVerified: true,
      saves: 1203
    },
    {
      id: "post3",
      author: {
        name: "Chef Mario",
        username: "chef_mario",
        avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "My secret pasta carbonara recipe! The key is using fresh farm eggs and high-quality guanciale. Who wants the full recipe? #cooking #italianfood #pasta",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "square" as const,
      },
      likes: 4582,
      comments: [
        {
          id: "comment5",
          author: {
            name: "Foodie Fan",
            username: "foodie123",
            avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Please share the recipe! Looks absolutely delicious!",
          timestamp: "30m ago",
        },
      ],
      timestamp: "6h ago",
      saves: 892,
      sponsored: true
    },
    {
      id: "post4",
      author: {
        name: "Travelista",
        username: "travel_mag",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "Hidden gems of Santorini that most tourists never discover. The view from this secluded spot is absolutely breathtaking! #travel #greece #wanderlust",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "video" as const,
      },
      likes: 8721,
      comments: [
        {
          id: "comment6",
          author: {
            name: "Wanderer",
            username: "world_traveler",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "Going to Santorini next month! Where exactly is this spot?",
          timestamp: "1h ago",
        },
      ],
      timestamp: "1d ago",
      location: "Santorini, Greece",
      isVerified: true,
      saves: 1543
    },
    {
      id: "post5",
      author: {
        name: "Nature Explorer",
        username: "nature_lover",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "Morning hike through the redwoods. The mist and sunlight created this magical scene. Nature is truly the best artist. #nature #hiking #forest #morninglight",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "square" as const,
      },
      likes: 3456,
      comments: [
        {
          id: "comment7",
          author: {
            name: "Mountain Climber",
            username: "peak_seeker",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "The light filtering through the trees is breathtaking! Where is this?",
          timestamp: "4h ago",
        },
      ],
      timestamp: "10h ago",
      location: "Redwood National Park",
      saves: 678
    },
    {
      id: "post6",
      author: {
        name: "Urban Photographer",
        username: "city_shots",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      content: {
        text: "City lights and urban geometry. Sometimes the most beautiful patterns are found in the chaos of city life. #urbanphotography #cityscape #nightphotography",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000&auto=format&fit=crop",
        aspectRatio: "video" as const,
      },
      likes: 5892,
      comments: [
        {
          id: "comment8",
          author: {
            name: "Architecture Buff",
            username: "design_eye",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
          },
          content: "The composition here is just perfect. Love how you captured the light reflections!",
          timestamp: "2h ago",
        },
      ],
      timestamp: "1d ago",
      location: "Downtown Chicago",
      isVerified: true,
      saves: 1023
    }
  ]
  
  // Function to handle refreshing the feed
  const handleRefreshFeed = () => {
    toast.success("Feed refreshed", {
      description: "New content has been loaded",
      position: "top-center"
    })
  }
  
  // Function to handle posting new content
  const handlePostSubmit = () => {
    toast.success("Post created successfully!", { 
      description: "Your post is now live",
      position: "top-center"
    })
    setShowPostOptions(false)
  }
  
  // Function to handle story view
  const handleStoryView = (storyId: string) => {
    setViewingStory(storyId)
    // In a real app, this would open a story viewer
    setTimeout(() => {
      setViewingStory(null)
      // Mark story as viewed in actual implementation
    }, 1000)
  }
  
  // Function to follow suggested account
  const handleFollow = (userId: string) => {
    toast.success("User followed", {
      description: "You're now following this account",
      position: "bottom-right"
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Refresh and Title */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/90 p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold">Safari</h1>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleRefreshFeed}>
                    <RefreshCw className="h-5 w-5" />
                    <span className="sr-only">Refresh Feed</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh Feed</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto w-full p-4">
            {/* Content Tabs */}
            <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="for-you">
                  <Sparkles className="h-4 w-4 mr-2" />
                  For You
                </TabsTrigger>
                <TabsTrigger value="following">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Following
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <Flame className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
              </TabsList>
            </Tabs>
          
            {/* Stories */}
            <div className="bg-card rounded-xl p-4 mb-6">
              <h2 className="font-medium mb-3 flex items-center">
                <Tv2 className="h-4 w-4 mr-2" />
                Stories
              </h2>
              <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex gap-4">
                  {stories.map((story) => (
                    <button 
                      key={story.id}
                      className="flex flex-col items-center space-y-1"
                      onClick={() => handleStoryView(story.id)}
                    >
                      <div className="relative">
                        <div className={`${story.hasUnviewed ? 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500' : 'bg-muted'} rounded-full p-[2px]`}>
                          <div className="bg-background rounded-full p-[2px]">
                            <Avatar className={`w-16 h-16 ${viewingStory === story.id ? 'ring-2 ring-primary' : ''}`}>
                              <AvatarImage src={story.user.avatar} alt={story.user.name} />
                              <AvatarFallback>{story.user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        {story.isYourStory && (
                          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-background">
                            <Plus className="h-4 w-4" />
                          </div>
                        )}
                        {story.type === "celebrity" || story.type === "brand" && (
                          <div className="absolute -top-1 -right-1 text-blue-500">
                            <div className="h-5 w-5 flex items-center justify-center bg-background rounded-full">
                              <Sparkles className="h-3 w-3" />
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-xs max-w-16 truncate">
                        {story.user.name}
                      </span>
                      {story.type && (
                        <Badge variant="outline" className="text-[0.65rem] h-4 px-1">
                          {story.type}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Post Creation */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Your profile" />
                    <AvatarFallback>YP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      className="border rounded-full py-2 px-4 focus-visible:ring-1"
                      placeholder="What's on your mind?"
                      onClick={() => setShowPostOptions(true)}
                    />
                  </div>
                </div>
                
                {showPostOptions && (
                  <div className="pt-2 border-t mt-2">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 px-3 items-center">
                        <ImageIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Photo</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 px-3 items-center">
                        <Video className="h-5 w-5 mb-1" />
                        <span className="text-xs">Video</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 px-3 items-center">
                        <Mic className="h-5 w-5 mb-1" />
                        <span className="text-xs">Audio</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 px-3 items-center">
                        <Music className="h-5 w-5 mb-1" />
                        <span className="text-xs">Music</span>
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => setShowPostOptions(false)}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handlePostSubmit}>
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                )}
                
                {!showPostOptions && (
                  <div className="flex justify-between pt-2 border-t mt-1">
                    <Button variant="ghost" size="sm" className="text-xs w-full flex justify-center items-center h-9">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs w-full flex justify-center items-center h-9">
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs w-full flex justify-center items-center h-9">
                      <Mic className="h-4 w-4 mr-1" />
                      Audio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Posts */}
            {activeTab === "for-you" && (
              <div>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {activeTab === "following" && (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="bg-muted rounded-full p-4">
                  <Bookmark className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">No posts from people you follow yet</h3>
                <p className="text-muted-foreground max-w-xs">
                  When you follow people, their posts will appear here.
                </p>
                <Button>Discover people to follow</Button>
              </div>
            )}
            
            {activeTab === "trending" && (
              <div>
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Flame className="h-4 w-4 mr-2 text-orange-500" />
                      Trending Now
                    </h3>
                    <div className="space-y-2">
                      {trendingTags.map((tag, i) => (
                        <div key={i} className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md cursor-pointer">
                          <div>
                            <p className="font-medium">{tag.tag}</p>
                            <p className="text-xs text-muted-foreground">{tag.posts} posts</p>
                          </div>
                          <Badge variant="secondary">{i + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Show some trending posts */}
                {posts.slice(1, 3).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:flex flex-col w-80 border-l p-4 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Your profile" />
              <AvatarFallback>YP</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 text-yellow-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-sm text-muted-foreground">@username</p>
          </div>

          {/* Settings and Post buttons */}
          <div className="flex gap-2 w-full">
            <Link href="/settings" className="flex-1">
              <Button variant="outline" className="w-full">
                <Cog className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Link href="/create" className="flex-1">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Post
              </Button>
            </Link>
          </div>
        </div>

        <Separator />
        
        {/* Suggested Accounts */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Suggested for You</h3>
          {suggestedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback>{account.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{account.username}</p>
                  <p className="text-xs text-muted-foreground">{account.reason}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleFollow(account.id)}
              >
                Follow
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* Weather Widget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              <span>San Francisco, CA</span>
            </div>
            <span>72°F</span>
          </div>
          <p className="text-xs text-muted-foreground">Partly cloudy with a high of 75°F</p>
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Link href="#" className="hover:underline">About</Link>
            <Link href="#" className="hover:underline">Help</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Developers</Link>
            <Link href="#" className="hover:underline">Settings</Link>
          </div>
          <p className="text-xs text-muted-foreground mt-2">© 2024 PixPulse</p>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


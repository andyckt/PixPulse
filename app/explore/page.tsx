"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Book, 
  Bookmark,
  Camera, 
  Compass, 
  Flame, 
  Hash, 
  Heart, 
  ImageIcon, 
  MapPin, 
  MessageSquare, 
  Mic, 
  Music, 
  PenTool, 
  Search, 
  Sparkles, 
  TrendingUp, 
  User, 
  Users, 
  Video, 
  X 
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { toast } from "sonner"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Content categories
  const categories = [
    { id: "all", name: "All", icon: <Compass className="h-4 w-4" /> },
    { id: "photography", name: "Photography", icon: <Camera className="h-4 w-4" /> },
    { id: "travel", name: "Travel", icon: <MapPin className="h-4 w-4" /> },
    { id: "food", name: "Food", icon: <Flame className="h-4 w-4" /> },
    { id: "music", name: "Music", icon: <Music className="h-4 w-4" /> },
    { id: "art", name: "Art", icon: <PenTool className="h-4 w-4" /> },
    { id: "books", name: "Books", icon: <Book className="h-4 w-4" /> },
  ]

  // Trending hashtags
  const trendingTags = [
    { tag: "#photography", posts: "23.5K", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1000&auto=format&fit=crop" },
    { tag: "#travel", posts: "18.2K", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop" },
    { tag: "#foodie", posts: "12.7K", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" },
    { tag: "#music", posts: "9.3K", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop" },
    { tag: "#art", posts: "7.8K", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop" },
    { tag: "#fitness", posts: "6.5K", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" },
  ]

  // Explore content - a mix of photos, videos, and audio
  const exploreContent = [
    { 
      id: "exp1", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop", 
      likes: 4823, 
      comments: 156,
      category: "travel"
    },
    { 
      id: "exp2", 
      type: "video", 
      image: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=1000&auto=format&fit=crop", 
      likes: 1953, 
      comments: 104,
      category: "music"
    },
    { 
      id: "exp3", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop", 
      likes: 3571, 
      comments: 87,
      category: "food"
    },
    { 
      id: "exp4", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1000&auto=format&fit=crop", 
      likes: 5213, 
      comments: 173,
      category: "photography"
    },
    { 
      id: "exp5", 
      type: "audio", 
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop", 
      likes: 976, 
      comments: 45,
      category: "music"
    },
    { 
      id: "exp6", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop", 
      likes: 2893, 
      comments: 112,
      category: "travel"
    },
    { 
      id: "exp7", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop", 
      likes: 3127, 
      comments: 94,
      category: "photography"
    },
    { 
      id: "exp8", 
      type: "video", 
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", 
      likes: 2461, 
      comments: 128,
      category: "art"
    },
    { 
      id: "exp9", 
      type: "photo", 
      image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1000&auto=format&fit=crop", 
      likes: 1893, 
      comments: 76,
      category: "books"
    },
  ]

  // Suggested creators
  const suggestedCreators = [
    { 
      id: "creator1", 
      name: "Jane Smith", 
      username: "jane_travels", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop", 
      followers: "45.2K",
      category: "travel",
      isVerified: true
    },
    { 
      id: "creator2", 
      name: "Alex Peterson", 
      username: "alex_photo", 
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop", 
      followers: "128K",
      category: "photography",
      isVerified: true
    },
    { 
      id: "creator3", 
      name: "Sara Johnson", 
      username: "sara_cooks", 
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop", 
      followers: "89.5K",
      category: "food",
      isVerified: false
    },
    { 
      id: "creator4", 
      name: "Mike Chen", 
      username: "mike_music", 
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop", 
      followers: "215K",
      category: "music",
      isVerified: true
    },
    { 
      id: "creator5", 
      name: "Emma Davis", 
      username: "emma_arts", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", 
      followers: "63.8K",
      category: "art",
      isVerified: false
    },
  ]

  // Filter explore content based on active category
  const filteredContent = activeCategory === "all" 
    ? exploreContent 
    : exploreContent.filter(item => item.category === activeCategory)

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.success("Searching for: " + searchQuery, {
        description: "Search functionality would be implemented here",
        position: "top-center",
      })
    }
  }

  // Handle follow
  const handleFollow = (creatorId: string) => {
    toast.success("Creator followed", {
      description: "You're now following this creator",
      position: "bottom-right",
    })
  }

  // Handle bookmark
  const handleBookmark = (contentId: string) => {
    toast.success("Saved to collections", {
      position: "bottom-right",
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/90 p-4 border-b">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <h1 className="text-2xl font-bold">Explore</h1>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users, tags, or keywords..." 
                  className="pl-10 pr-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
                <button type="submit" className="sr-only">Search</button>
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full p-4">
          <Tabs defaultValue="discover" className="mb-6">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="discover">
                <Compass className="h-4 w-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="creators">
                <Users className="h-4 w-4 mr-2" />
                Creators
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover">
              {/* Categories */}
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className="flex items-center gap-1.5 whitespace-nowrap"
                      onClick={() => setActiveCategory(category.id)}
                      size="sm"
                    >
                      {category.icon}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredContent.map((item) => (
                  <div key={item.id} className="aspect-square relative group overflow-hidden rounded-md cursor-pointer">
                    <Image
                      src={item.image}
                      alt={`Explore content ${item.id}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    {/* Content Type Indicator */}
                    {item.type !== "photo" && (
                      <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5">
                        {item.type === "video" ? (
                          <Video className="h-4 w-4 text-white" />
                        ) : (
                          <Mic className="h-4 w-4 text-white" />
                        )}
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 space-y-1">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.comments.toLocaleString()}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(item.id);
                          }}
                          className="text-white hover:text-primary"
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="space-y-6">
                {/* Featured Trending Hashtag */}
                <div className="relative rounded-lg overflow-hidden">
                  <div className="aspect-[21/9] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop"
                      alt="Featured trending hashtag"
                      fill
                      className="object-cover brightness-75"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <Badge className="w-fit mb-2 bg-primary border-none">Featured</Badge>
                      <h2 className="text-2xl font-bold text-white">#naturelovers</h2>
                      <p className="text-white/80">32.7K posts this week</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Trending Hashtags
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {trendingTags.map((tag, i) => (
                    <Card key={i} className="overflow-hidden group cursor-pointer">
                      <div className="relative aspect-square">
                        <Image
                          src={tag.image}
                          alt={tag.tag}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 className="font-semibold text-white flex items-center">
                            <Hash className="h-4 w-4 mr-1" />
                            {tag.tag.substring(1)}
                          </h3>
                          <p className="text-sm text-white/70">{tag.posts} posts</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="creators">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Popular Creators
                </h2>

                <div className="grid gap-4">
                  {suggestedCreators.map((creator) => (
                    <Card key={creator.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 border-2 border-primary">
                                <AvatarImage src={creator.avatar} alt={creator.name} />
                                <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              {creator.isVerified && (
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-[3px]">
                                  <Sparkles className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{creator.username}</p>
                                {creator.isVerified && <Sparkles className="h-3.5 w-3.5 ml-1 text-blue-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{creator.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs font-normal">
                                  {creator.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{creator.followers} followers</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFollow(creator.id)}
                          >
                            Follow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" className="w-full max-w-md">
                    <User className="h-4 w-4 mr-2" />
                    Discover More Creators
                  </Button>
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
"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bookmark, 
  Grid, 
  Settings, 
  UserPlus, 
  Globe, 
  Calendar, 
  MapPin, 
  Briefcase,
  Link as LinkIcon,
  Edit3,
  Award,
  Hexagon,
  Heart,
  MessageCircle,
  Share2,
  Plus
} from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { ProfileGallery } from "@/components/profile-gallery"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FollowersList } from "@/components/followers-list"
import { PostDetailModal } from "@/components/post-detail-modal"

// Mock data for demonstration
const PROFILE_DATA = {
  username: "johndoe",
  name: "John Doe",
  bio: "Digital creator | Photographer | Traveler | Coffee enthusiast 📸 ✈️ ☕",
  website: "https://johndoe.com",
  location: "New York, NY",
  joinDate: "Joined March 2019",
  work: "Designer at CreativeCo",
  stats: {
    posts: 142,
    followers: 12800,
    following: 567,
    likes: 24500
  },
  achievements: [
    { title: "Top Creator", icon: "Award" },
    { title: "Verified", icon: "CheckCircle" },
    { title: "2 Year Club", icon: "Clock" }
  ],
  highlights: [
    { id: 1, title: "Travel", cover: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=400&q=80&fit=crop" },
    { id: 2, title: "Food", cover: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=400&h=400&q=80&fit=crop" },
    { id: 3, title: "Photography", cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&q=80&fit=crop" },
    { id: 4, title: "Projects", cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&q=80&fit=crop" }
  ],
  posts: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&q=80&fit=crop",
      likes: 1248,
      comments: 42,
      date: "2d ago",
      location: "Yosemite National Park",
      caption: "Find me where the wild things are 🏔️ #yosemite #nature #adventure"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&q=80&fit=crop",
      likes: 932,
      comments: 29,
      isMulti: true,
      date: "5d ago",
      location: "Central Park, New York",
      caption: "Perfect day for a picnic with friends 🌳 #weekend #friends #centralpark"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&q=80&fit=crop",
      likes: 2405,
      comments: 87,
      date: "1w ago",
      location: "Downtown Studio",
      caption: "New headshots for the portfolio 📸 #portrait #photography"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600314831324-70a70be2b0af?w=600&h=600&q=80&fit=crop",
      likes: 1056,
      comments: 35,
      isVideo: true,
      date: "1w ago",
      location: "Home Office",
      caption: "Behind the scenes of my latest project ✨ #design #creative #process"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=600&q=80&fit=crop",
      likes: 842,
      comments: 19,
      date: "2w ago",
      location: "Beach Club",
      caption: "Summer nights with the best crew 🌊 #beach #sunset #friends"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&q=80&fit=crop",
      likes: 1748,
      comments: 63,
      date: "2w ago",
      location: "Coffee Lab",
      caption: "Monday motivation in a cup ☕ #coffee #monday #workmode"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=600&q=80&fit=crop",
      likes: 2031,
      comments: 71,
      date: "3w ago",
      location: "Malibu, California",
      caption: "Golden hour is pure magic ✨ #sunset #malibu #goldenhour"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&h=600&q=80&fit=crop",
      likes: 1352,
      comments: 47,
      isMulti: true,
      date: "3w ago",
      location: "Urban Outfitters",
      caption: "Weekend shopping haul 🛍️ #fashion #shopping #style"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1505015390928-f9e55218544f?w=600&h=600&q=80&fit=crop",
      likes: 987,
      comments: 28,
      isVideo: true,
      date: "1m ago",
      location: "Fitness Hub",
      caption: "Morning workout routine 💪 #fitness #health #motivation"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&q=80&fit=crop",
      likes: 2583,
      comments: 93,
      date: "1m ago",
      location: "Colorado Mountains",
      caption: "Disconnecting to reconnect 🏔️ #hiking #nature #mindfulness"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&q=80&fit=crop",
      likes: 1174,
      comments: 39,
      date: "1m ago",
      location: "City Lights Bookstore",
      caption: "Sunday reads 📚 #books #relaxing #weekend"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=600&h=600&q=80&fit=crop",
      likes: 1642,
      comments: 58,
      date: "2m ago",
      location: "Harmony Gardens",
      caption: "Taking time to smell the flowers 🌸 #spring #flowers #mindfulness"
    }
  ],
  saved: [
    {
      id: 101,
      image: "https://images.unsplash.com/photo-1530653333484-8e1b79e1e8b0?w=600&h=600&q=80&fit=crop",
      likes: 3245,
      comments: 112,
      isSaved: true,
      date: "Saved 3d ago"
    },
    {
      id: 102,
      image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=600&h=600&q=80&fit=crop",
      likes: 2867,
      comments: 94,
      isSaved: true,
      date: "Saved 1w ago"
    },
    {
      id: 103,
      image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&h=600&q=80&fit=crop",
      likes: 1932,
      comments: 65,
      isSaved: true,
      date: "Saved 2w ago"
    },
    {
      id: 104,
      image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=600&h=600&q=80&fit=crop",
      likes: 2145,
      comments: 76,
      isSaved: true,
      date: "Saved 3w ago"
    },
    {
      id: 105,
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=600&h=600&q=80&fit=crop",
      likes: 1854,
      comments: 67,
      isSaved: true,
      date: "Saved 1m ago"
    }
  ],
  tagged: [
    {
      id: 201,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&q=80&fit=crop",
      likes: 1487,
      comments: 54,
      date: "Tagged 5d ago"
    },
    {
      id: 202,
      image: "https://images.unsplash.com/photo-1558446425-acc4e45e338d?w=600&h=600&q=80&fit=crop",
      likes: 2156,
      comments: 81,
      date: "Tagged 2w ago"
    },
    {
      id: 203,
      image: "https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?w=600&h=600&q=80&fit=crop",
      likes: 1932,
      comments: 69,
      date: "Tagged 1m ago"
    }
  ],
  followersData: Array(15).fill(null).map((_, i) => ({
    id: `follower-${i}`,
    name: `Follower ${i + 1}`,
    username: `follower${i + 1}`,
    avatar: `https://images.unsplash.com/photo-${1550000000000 + i * 100000}?w=80&h=80&q=80&fit=crop`,
    isVerified: i % 5 === 0,
    isFollowing: i % 3 === 0
  })),
  followingData: Array(8).fill(null).map((_, i) => ({
    id: `following-${i}`,
    name: `Following ${i + 1}`,
    username: `following${i + 1}`,
    avatar: `https://images.unsplash.com/photo-${1560000000000 + i * 100000}?w=80&h=80&q=80&fit=crop`,
    isVerified: i % 4 === 0
  }))
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
  const [followersInitialTab, setFollowersInitialTab] = useState("followers")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [postDetailOpen, setPostDetailOpen] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  const handlePostClick = (post: any) => {
    // Add user data to the post
    const postWithDetails = {
      ...post,
      user: {
        name: PROFILE_DATA.name,
        username: PROFILE_DATA.username,
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&q=80&fit=crop",
        isVerified: true
      }
    };
    
    setSelectedPost(postWithDetails);
    setPostDetailOpen(true);
  }

  const handleFollowToggle = (userId: string, isFollowing: boolean) => {
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
    // Here you would update the follow status in your data store
  }
  
  const openFollowersDialog = (tab: "followers" | "following") => {
    setFollowersInitialTab(tab);
    setFollowersDialogOpen(true);
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto w-full p-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-36 md:h-36 border-4 border-background shadow-md">
                <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&q=80&fit=crop" alt="John Doe profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-primary text-white">
                <Award className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">@{PROFILE_DATA.username}</h1>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Hexagon className="h-5 w-5 text-blue-500 fill-blue-100" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Verified Account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-muted-foreground">{PROFILE_DATA.name}</p>
                </div>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button 
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">Message</Button>
                  <Link href="/profile/edit">
                    <Button variant="outline" size="icon">
                      <Edit3 className="h-5 w-5" />
                      <span className="sr-only">Edit Profile</span>
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" size="icon">
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <p className="font-bold">{formatNumber(PROFILE_DATA.stats.posts)}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <button 
                  className="text-center hover:opacity-80 transition-opacity"
                  onClick={() => openFollowersDialog("followers")}
                >
                  <p className="font-bold">{formatNumber(PROFILE_DATA.stats.followers)}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </button>
                <button 
                  className="text-center hover:opacity-80 transition-opacity"
                  onClick={() => openFollowersDialog("following")}
                >
                  <p className="font-bold">{formatNumber(PROFILE_DATA.stats.following)}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </button>
                <div className="text-center">
                  <p className="font-bold">{formatNumber(PROFILE_DATA.stats.likes)}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm whitespace-pre-line">{PROFILE_DATA.bio}</p>
                
                <div className="flex flex-col gap-1 text-sm">
                  {PROFILE_DATA.website && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <a href={PROFILE_DATA.website} className="text-blue-500 hover:underline">{PROFILE_DATA.website.replace('https://', '')}</a>
                    </div>
                  )}
                  {PROFILE_DATA.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{PROFILE_DATA.location}</span>
                    </div>
                  )}
                  {PROFILE_DATA.work && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{PROFILE_DATA.work}</span>
                    </div>
                  )}
                  {PROFILE_DATA.joinDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{PROFILE_DATA.joinDate}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROFILE_DATA.achievements.map((achievement, idx) => (
                    <Badge key={idx} variant="secondary" className="px-2 py-1">
                      <Award className="h-3 w-3 mr-1" />
                      {achievement.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Story Highlights */}
          <div className="mb-8">
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs">New</span>
                </div>
                
                {PROFILE_DATA.highlights.map((highlight) => (
                  <div key={highlight.id} className="flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-full border-2 border-primary p-1">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image 
                          src={highlight.cover}
                          alt={highlight.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-xs">{highlight.title}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Profile Content */}
          <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
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
              <ProfileGallery 
                posts={PROFILE_DATA.posts} 
                onPostClick={handlePostClick}
                emptyMessage={{
                  icon: <Grid className="h-16 w-16 mx-auto text-muted-foreground" />,
                  title: "No posts yet",
                  description: "When you share posts, they'll appear here."
                }}
              />
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <ProfileGallery 
                posts={PROFILE_DATA.saved}
                onPostClick={handlePostClick} 
                emptyMessage={{
                  icon: <Bookmark className="h-16 w-16 mx-auto text-muted-foreground" />,
                  title: "No saved posts yet",
                  description: "Posts you save will appear here."
                }}
              />
            </TabsContent>

            <TabsContent value="tagged" className="mt-6">
              <ProfileGallery 
                posts={PROFILE_DATA.tagged}
                onPostClick={handlePostClick}
                emptyMessage={{
                  icon: <UserPlus className="h-16 w-16 mx-auto text-muted-foreground" />,
                  title: "No tagged posts",
                  description: "When people tag you in posts, they'll appear here."
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Followers/Following Dialog */}
      <Dialog open={followersDialogOpen} onOpenChange={setFollowersDialogOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <FollowersList
            followers={PROFILE_DATA.followersData}
            following={PROFILE_DATA.followingData}
            onClose={() => setFollowersDialogOpen(false)}
            onFollowToggle={handleFollowToggle}
          />
        </DialogContent>
      </Dialog>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        open={postDetailOpen}
        onOpenChange={setPostDetailOpen}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


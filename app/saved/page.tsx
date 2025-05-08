"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bookmark, 
  Filter, 
  FolderClosed, 
  FolderPlus, 
  GridIcon, 
  ListFilter, 
  PlusCircle, 
  Search, 
  SlidersHorizontal
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { PostDetailModal } from "@/components/post-detail-modal"
import { CollectionsManager } from "@/components/collections-manager"

export default function SavedPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeView, setActiveView] = useState<"grid" | "list">("grid")
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [postDetailOpen, setPostDetailOpen] = useState(false)
  const [collectionsManagerOpen, setCollectionsManagerOpen] = useState(false)
  
  // Sample collections and saved posts data
  const collections = [
    { id: "all", name: "All Saved", count: 35, isDefault: true },
    { id: "travel", name: "Travel Inspiration", count: 12, isDefault: false },
    { id: "recipes", name: "Recipes to Try", count: 8, isDefault: false },
    { id: "fashion", name: "Style Ideas", count: 7, isDefault: false },
    { id: "home", name: "Home Decor", count: 5, isDefault: false },
    { id: "fitness", name: "Workout Routines", count: 3, isDefault: false }
  ]
  
  // Sample saved posts with enhanced details
  const savedPosts = [
    {
      id: "saved1",
      image: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=600&h=600&q=80&fit=crop",
      caption: "The perfect tropical getaway 🌴 #travel #paradise #vacation",
      savedDate: "2d ago",
      collections: ["travel"],
      author: {
        name: "Travel Magazine",
        username: "travelmag",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 12458,
        comments: 143,
        saved: 3200
      },
      type: "photo"
    },
    {
      id: "saved2",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&q=80&fit=crop",
      caption: "Homemade pizza night 🍕 Recipe in comments! #foodie #homecooking",
      savedDate: "1w ago",
      collections: ["recipes"],
      author: {
        name: "Food Network",
        username: "foodnetwork",
        avatar: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 8732,
        comments: 312,
        saved: 2100
      },
      type: "photo"
    },
    {
      id: "saved3",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=600&q=80&fit=crop",
      caption: "Fall fashion essentials 🍂 #style #autumn #fashion",
      savedDate: "2w ago",
      collections: ["fashion"],
      author: {
        name: "Style Magazine",
        username: "stylemag",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 6254,
        comments: 98,
        saved: 1450
      },
      type: "carousel"
    },
    {
      id: "saved4",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=600&q=80&fit=crop",
      caption: "Minimal home office setup ✨ #homeoffice #minimal #productivity",
      savedDate: "3w ago",
      collections: ["home"],
      author: {
        name: "Home & Design",
        username: "homedesign",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 4532,
        comments: 76,
        saved: 980
      },
      type: "photo"
    },
    {
      id: "saved5",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=600&q=80&fit=crop",
      caption: "15-minute HIIT workout 💪 Full routine in the video! #fitness #workout #hiit",
      savedDate: "1m ago",
      collections: ["fitness"],
      author: {
        name: "Fitness First",
        username: "fitnessfirst",
        avatar: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 3214,
        comments: 210,
        saved: 1875
      },
      type: "video"
    },
    {
      id: "saved6",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&q=80&fit=crop",
      caption: "Avocado toast with poached eggs 🥑 #brunch #healthy #foodie",
      savedDate: "1m ago",
      collections: ["recipes"],
      author: {
        name: "Healthy Eats",
        username: "healthyeats",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&fit=crop"
      },
      meta: {
        likes: 2957,
        comments: 124,
        saved: 1432
      },
      type: "photo"
    }
  ]
  
  // Add cover images to collections for the manager
  const collectionsWithCovers = collections.map(collection => {
    // Find posts in this collection
    const postsInCollection = savedPosts.filter(
      post => collection.isDefault || post.collections.includes(collection.id)
    )
    
    // Get up to 3 images for the collection covers
    const coverImages = postsInCollection.slice(0, 3).map(post => post.image)
    
    return {
      ...collection,
      coverImages
    }
  })
  
  // Filter saved posts based on active collection and search query
  const filteredPosts = savedPosts
    .filter(post => {
      // Filter by collection
      if (activeCollection && activeCollection !== 'all') {
        return post.collections.includes(activeCollection)
      }
      return true
    })
    .filter(post => {
      // Filter by search query
      if (searchQuery.trim()) {
        return (
          post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      return true
    })
  
  // Event handlers
  const handleCreateCollection = (name: string) => {
    toast.success(`Collection "${name}" created`, {
      description: "You can now save posts to this collection",
      position: "bottom-center",
    })
  }
  
  const handlePostClick = (post: any) => {
    setSelectedPost(post)
    setPostDetailOpen(true)
  }
  
  const handleRemoveFromSaved = (postId: string) => {
    toast.success("Removed from saved posts", {
      position: "bottom-center",
    })
  }
  
  const handleAddToCollection = (postId: string, collectionId: string) => {
    toast.success(`Added to collection`, {
      position: "bottom-center",
    })
  }
  
  const handleRemoveFromCollection = (postId: string, collectionId: string) => {
    toast.success(`Removed from collection`, {
      position: "bottom-center",
    })
  }
  
  const handleDeleteCollection = (id: string) => {
    toast.success(`Collection deleted`, {
      position: "bottom-center",
    })
  }
  
  const handleRenameCollection = (id: string, name: string) => {
    toast.success(`Collection renamed to "${name}"`, {
      position: "bottom-center",
    })
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/90 p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Saved</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCollectionsManagerOpen(true)}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Manage Collections
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search saved posts" 
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
              
              <div className="flex items-center rounded-md border overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "rounded-none border-r h-9 px-2.5", 
                    activeView === "grid" && "bg-muted"
                  )}
                  onClick={() => setActiveView("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "rounded-none h-9 px-2.5", 
                    activeView === "list" && "bg-muted"
                  )}
                  onClick={() => setActiveView("list")}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <ScrollArea className="pb-2 -mx-4 px-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
              {collections.map(collection => (
                <Badge 
                  key={collection.id}
                  variant={activeCollection === collection.id ? "default" : "outline"}
                  className="cursor-pointer py-1.5 px-3"
                  onClick={() => setActiveCollection(collection.id)}
                >
                  {collection.isDefault ? (
                    <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                  ) : (
                    <FolderClosed className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  {collection.name}
                  <span className="ml-1.5 text-xs opacity-70">({collection.count})</span>
                </Badge>
              ))}
              
              <Dialog open={newCollectionDialogOpen} onOpenChange={setNewCollectionDialogOpen}>
                <DialogTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer py-1.5 px-3 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                    New Collection
                  </Badge>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create new collection</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="collection-name">Collection name</Label>
                      <Input 
                        id="collection-name" 
                        placeholder="e.g., Travel Inspiration" 
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => {
                      if (newCollectionName.trim()) {
                        handleCreateCollection(newCollectionName)
                        setNewCollectionName("")
                        setNewCollectionDialogOpen(false)
                      } else {
                        toast.error("Please enter a collection name", {
                          position: "bottom-center",
                        })
                      }
                    }}>Create Collection</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </ScrollArea>
          
          {showFilters && (
            <div className="mt-3 p-3 border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Filter saved posts</h3>
                <Button variant="ghost" size="sm">
                  Reset
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">Photos</Badge>
                <Badge variant="outline" className="cursor-pointer">Videos</Badge>
                <Badge variant="outline" className="cursor-pointer">Carousels</Badge>
                <Badge variant="outline" className="cursor-pointer">Most Recent</Badge>
                <Badge variant="outline" className="cursor-pointer">Most Saved</Badge>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto w-full p-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved posts found</h3>
              <p className="text-muted-foreground mb-6">
                No posts match your current search or filters.
              </p>
              <Button onClick={() => {
                setSearchQuery("")
                setActiveCollection(null)
              }}>
                Clear filters
              </Button>
            </div>
          ) : (
            activeView === "grid" ? (
              // Grid view
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden group">
                    <CardContent className="p-0 relative">
                      <div 
                        className="aspect-square cursor-pointer"
                        onClick={() => handlePostClick(post)}
                      >
                        <Image
                          src={post.image}
                          alt={post.caption}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Post type indicator */}
                        {post.type !== 'photo' && (
                          <div className="absolute top-2 right-2 text-white">
                            {post.type === 'video' && (
                              <svg className="h-5 w-5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                            {post.type === 'carousel' && (
                              <svg className="h-5 w-5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                              </svg>
                            )}
                          </div>
                        )}
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
                          <div className="flex items-center gap-6 text-white font-semibold">
                            <div className="flex items-center">
                              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              <span>{post.meta.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z" />
                              </svg>
                              <span>{post.meta.comments.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-2 right-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                  <SlidersHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRemoveFromSaved(post.id)}>
                                  Remove from saved
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  Add to collection
                                </DropdownMenuItem>
                                {collections
                                  .filter(collection => !collection.isDefault)
                                  .map(collection => (
                                    <DropdownMenuItem 
                                      key={collection.id}
                                      onClick={() => handleAddToCollection(post.id, collection.id)}
                                      className="pl-6"
                                    >
                                      {collection.name}
                                    </DropdownMenuItem>
                                  ))
                                }
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // List view
              <div className="flex flex-col gap-4">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative md:w-48 h-48 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.caption}
                            fill
                            className="object-cover rounded-md"
                          />
                          {post.type !== 'photo' && (
                            <div className="absolute top-2 right-2 text-white">
                              {post.type === 'video' && (
                                <svg className="h-5 w-5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                              {post.type === 'carousel' && (
                                <svg className="h-5 w-5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{post.author.name}</p>
                                <p className="text-xs text-muted-foreground">@{post.author.username}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Saved {post.savedDate}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <SlidersHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleRemoveFromSaved(post.id)}>
                                    Remove from saved
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    Add to collection
                                  </DropdownMenuItem>
                                  {collections
                                    .filter(collection => !collection.isDefault)
                                    .map(collection => (
                                      <DropdownMenuItem 
                                        key={collection.id}
                                        onClick={() => handleAddToCollection(post.id, collection.id)}
                                        className="pl-6"
                                      >
                                        {collection.name}
                                      </DropdownMenuItem>
                                    ))
                                  }
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <p className="text-sm line-clamp-3">{post.caption}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span>{post.meta.likes.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z" />
                                </svg>
                                <span>{post.meta.comments.toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {post.collections.map(collectionId => {
                                const collection = collections.find(c => c.id === collectionId)
                                if (!collection) return null
                                
                                return (
                                  <Badge 
                                    key={collectionId} 
                                    variant="outline" 
                                    className="text-xs"
                                  >
                                    <FolderClosed className="h-3 w-3 mr-1" />
                                    {collection.name}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePostClick(post)}
                            >
                              View Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        open={postDetailOpen}
        onOpenChange={setPostDetailOpen}
      />
      
      {/* Collections Manager */}
      <CollectionsManager
        open={collectionsManagerOpen}
        onOpenChange={setCollectionsManagerOpen}
        collections={collectionsWithCovers}
        onCreateCollection={handleCreateCollection}
        onDeleteCollection={handleDeleteCollection}
        onRenameCollection={handleRenameCollection}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
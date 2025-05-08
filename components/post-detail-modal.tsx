"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bookmark, 
  FolderClosed, 
  Heart, 
  MessageCircle, 
  MoreHorizontal, 
  Send,
  Share2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// Define interfaces for our data types
interface Author {
  name: string;
  username: string;
  avatar: string;
}

interface PostMeta {
  likes: number;
  comments: number;
  saved: number;
}

interface Post {
  id: string;
  image: string;
  caption: string;
  savedDate: string;
  collections: string[];
  author: Author;
  meta: PostMeta;
  type: 'photo' | 'video' | 'carousel';
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface PostDetailModalProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostDetailModal({ post, open, onOpenChange }: PostDetailModalProps) {
  const [activeTab, setActiveTab] = useState("comments")
  const [commentInput, setCommentInput] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.meta?.likes || 0)
  
  // Mock comments data
  const comments: Comment[] = post ? [
    {
      id: "comment1",
      author: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&q=80&fit=crop"
      },
      content: "This is absolutely stunning! Where exactly was this taken?",
      timestamp: "2d ago",
      likes: 24,
      isLiked: false
    },
    {
      id: "comment2", 
      author: {
        name: "Sophia Chen",
        username: "sophiac",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&fit=crop"
      },
      content: "I need to add this place to my travel bucket list! The colors are just incredible 😍",
      timestamp: "1d ago",
      likes: 18,
      isLiked: true,
      replies: [
        {
          id: "reply1",
          author: {
            name: post?.author?.name || "Author",
            username: post?.author?.username || "username",
            avatar: post?.author?.avatar || ""
          },
          content: "Thank you! It's even more beautiful in person, believe it or not!",
          timestamp: "20h ago",
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: "comment3",
      author: {
        name: "Marco Rivera",
        username: "marco_r",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&q=80&fit=crop"
      },
      content: "The lighting in this shot is absolutely perfect. What time of day did you take this?",
      timestamp: "14h ago",
      likes: 9,
      isLiked: false
    }
  ] : []
  
  // Handle like functionality
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev: number) => prev - 1)
    } else {
      setLikeCount((prev: number) => prev + 1)
    }
    setIsLiked(!isLiked)
  }
  
  // Handle comment submission
  const handleSubmitComment = () => {
    if (commentInput.trim()) {
      toast.success("Comment added", {
        position: "bottom-center",
      })
      setCommentInput("")
    }
  }
  
  // Handle comment like
  const handleCommentLike = (commentId: string) => {
    // This would update the comment likes in a real app
    toast.success("Comment liked", {
      position: "bottom-center",
    })
  }
  
  if (!post) return null
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full max-h-[calc(95vh-2rem)]">
          {/* Left side - Image */}
          <div className="relative md:w-1/2 h-[300px] md:h-auto bg-black flex items-center justify-center overflow-hidden">
            <Image
              src={post.image}
              alt={post.caption}
              fill
              className="object-contain"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-1/2 flex flex-col h-full">
            {/* Header - Post author */}
            <div className="p-4 border-b flex items-center justify-between">
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Follow {post.author.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Share post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Report post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="comments" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 w-full rounded-none border-b">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              {/* Comments Tab */}
              <TabsContent value="comments" className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    <p className="text-sm">{post.caption}</p>
                    
                    <div className="pt-2 pb-4 border-b">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <span>Posted {post.savedDate}</span>
                        <span>•</span>
                        <span>{post.meta.comments} comments</span>
                        <span>•</span>
                        <span>{likeCount.toLocaleString()} likes</span>
                      </div>
                    </div>
                    
                    {comments.map(comment => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex gap-2">
                          <Avatar className="h-7 w-7 flex-shrink-0">
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 flex-1">
                            <div className="bg-muted/50 rounded-lg p-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-medium">{comment.author.name}</span>
                                  <span className="text-xs text-muted-foreground ml-1">@{comment.author.username}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs pl-2">
                              <button 
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => handleCommentLike(comment.id)}
                              >
                                {comment.likes} likes
                              </button>
                              <button className="text-muted-foreground hover:text-foreground transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Comment replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="pl-8">
                            {comment.replies.map(reply => (
                              <div key={reply.id} className="flex gap-2">
                                <Avatar className="h-6 w-6 flex-shrink-0">
                                  <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                  <AvatarFallback>{reply.author.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1 flex-1">
                                  <div className="bg-muted/30 rounded-lg p-2">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <span className="text-sm font-medium">{reply.author.name}</span>
                                        <span className="text-xs text-muted-foreground ml-1">@{reply.author.username}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm mt-1">{reply.content}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-xs pl-2">
                                    <button 
                                      className="text-muted-foreground hover:text-foreground transition-colors"
                                      onClick={() => handleCommentLike(reply.id)}
                                    >
                                      {reply.likes} likes
                                    </button>
                                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Comment input area */}
                <div className="p-3 border-t flex gap-2 items-center">
                  <Input 
                    placeholder="Add a comment..." 
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    disabled={!commentInput.trim()}
                    onClick={handleSubmitComment}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              {/* Details Tab */}
              <TabsContent value="details" className="p-4 space-y-4 flex-1 overflow-auto">
                <div>
                  <h3 className="text-sm font-medium mb-2">Saved in Collections</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.collections && post.collections.length > 0 ? (
                      post.collections.map(collectionId => (
                        <Badge 
                          key={collectionId} 
                          variant="outline"
                        >
                          <FolderClosed className="h-3 w-3 mr-1" />
                          {collectionId}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Not saved in any collections</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Engagement</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-3 text-center">
                      <Heart className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-lg font-medium">{likeCount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <MessageCircle className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-lg font-medium">{post.meta.comments.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Comments</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <Bookmark className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-lg font-medium">{post.meta.saved.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Saves</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Post Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Post type:</span>
                      <span className="font-medium capitalize">{post.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saved on:</span>
                      <span className="font-medium">{post.savedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account type:</span>
                      <span className="font-medium">Professional</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Footer - Action buttons */}
            <div className="border-t p-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLike}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
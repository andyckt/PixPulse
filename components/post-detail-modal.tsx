"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Send,
  Calendar,
  Play,
  MapPin,
  Hexagon
} from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    isVerified?: boolean
  }
  content: string
  likes: number
  timestamp: string
  isLiked?: boolean
}

interface PostDetailProps {
  post?: {
    id: number
    image: string
    likes: number
    comments: number
    isVideo?: boolean
    isMulti?: boolean
    isSaved?: boolean
    date?: string
    location?: string
    caption?: string
    user?: {
      name: string
      username: string
      avatar: string
      isVerified?: boolean
    }
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostDetailModal({ post, open, onOpenChange }: PostDetailProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(post?.isSaved || false)
  const [commentText, setCommentText] = useState("")
  const [postComments, setPostComments] = useState<Comment[]>([
    {
      id: "comment-1",
      user: {
        name: "Sarah Johnson",
        username: "sarahj",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80&fit=crop",
        isVerified: true
      },
      content: "This is absolutely beautiful! Where was this taken?",
      likes: 24,
      timestamp: "2h ago",
      isLiked: false
    },
    {
      id: "comment-2",
      user: {
        name: "Mike Chen",
        username: "mikechen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop"
      },
      content: "Amazing shot! The composition is perfect 📸",
      likes: 15,
      timestamp: "5h ago",
      isLiked: true
    },
    {
      id: "comment-3",
      user: {
        name: "Emily Rodriguez",
        username: "emilyrod",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop"
      },
      content: "I need to visit this place soon! Added to my bucket list ✨",
      likes: 9,
      timestamp: "1d ago",
      isLiked: false
    }
  ])
  
  if (!post) return null
  
  const handleLikeToggle = () => {
    setLiked(!liked)
  }
  
  const handleSaveToggle = () => {
    setSaved(!saved)
  }
  
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "John Doe",
        username: "johndoe",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&q=80&fit=crop"
      },
      content: commentText.trim(),
      likes: 0,
      timestamp: "Just now",
      isLiked: false
    }
    
    setPostComments([newComment, ...postComments])
    setCommentText("")
  }
  
  const handleCommentLike = (commentId: string) => {
    setPostComments(
      postComments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    )
  }
  
  const totalLikes = liked ? post.likes + 1 : post.likes

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-5xl w-[calc(100%-2rem)] rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-[80vh] md:h-[calc(100vh-8rem)]">
          {/* Image Section */}
          <div className="md:w-3/5 relative bg-black flex items-center">
            {post.isVideo ? (
              <div className="relative w-full h-full">
                <Image 
                  src={post.image} 
                  alt="Post image" 
                  fill 
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-4">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            ) : (
              <Image 
                src={post.image} 
                alt="Post image" 
                fill 
                className="object-contain"
              />
            )}
          </div>
          
          {/* Comments Section */}
          <div className="md:w-2/5 flex flex-col border-l">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={post.user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&q=80&fit=crop"} 
                    alt={post.user?.name || "User"} 
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">
                      {post.user?.username || "johndoe"}
                    </p>
                    {post.user?.isVerified && (
                      <Hexagon className="h-3.5 w-3.5 text-blue-500 fill-blue-100" />
                    )}
                  </div>
                  {post.location && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{post.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Comments Area */}
            <ScrollArea className="flex-1 p-4">
              {/* Caption */}
              {(post.caption || post.date) && (
                <div className="flex gap-3 mb-6">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={post.user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&q=80&fit=crop"} 
                      alt={post.user?.name || "User"} 
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm mb-1">
                      <span className="font-medium">{post.user?.username || "johndoe"}</span>{" "}
                      {post.caption || "Beautiful sunset at the beach today! #nature #photography"}
                    </p>
                    {post.date && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Comments List */}
              <div className="space-y-4">
                {postComments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between">
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">
                              {comment.user.username}
                            </span>{" "}
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{comment.timestamp}</span>
                            {comment.likes > 0 && (
                              <span>{comment.likes} likes</span>
                            )}
                            <button className="hover:text-foreground transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => handleCommentLike(comment.id)}
                        >
                          <Heart className={`h-3.5 w-3.5 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Actions */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLikeToggle}
                  >
                    <Heart className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                    <span className="sr-only">Comment</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-6 w-6" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSaveToggle}
                >
                  <Bookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`} />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold">{formatNumber(totalLikes)} likes</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&q=80&fit=crop" 
                    alt="Your avatar" 
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center">
                  <Textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-0 h-10 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-2.5"
                  />
                  {commentText.trim() && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary font-semibold px-3"
                      onClick={handleCommentSubmit}
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
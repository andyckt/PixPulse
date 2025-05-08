"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bookmark, 
  Heart, 
  MapPin, 
  MessageCircle, 
  MoreHorizontal, 
  Save, 
  Send, 
  Share, 
  Sparkles
} from "lucide-react"
import Image from "next/image"
import { CommentWindow } from "./comment-window"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

interface Comment {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
}

interface PostCardProps {
  post: {
    id: string
    author: {
      name: string
      username: string
      avatar: string
    }
    content: {
      text: string
      image: string
      aspectRatio?: "square" | "video"
    }
    likes: number
    comments: Comment[]
    timestamp: string
    isLiked?: boolean
    isVerified?: boolean
    location?: string
    saves?: number
    sponsored?: boolean
  }
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [comments, setComments] = useState<Comment[]>(post.comments)
  const [showComments, setShowComments] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [savesCount, setSavesCount] = useState(post.saves || 0)

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1)
      toast.success("Post unliked", {
        position: "bottom-center",
        duration: 2000
      })
    } else {
      setLikesCount((prev) => prev + 1)
      toast.success("Post liked", {
        position: "bottom-center",
        duration: 2000
      })
    }
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    if (isSaved) {
      setSavesCount((prev) => prev - 1)
      toast.success("Removed from saved", {
        position: "bottom-center",
        duration: 2000
      })
    } else {
      setSavesCount((prev) => prev + 1)
      toast.success("Saved to collection", {
        position: "bottom-center",
        duration: 2000
      })
    }
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    toast.success("Sharing options opened", {
      position: "bottom-center",
      duration: 2000
    })
  }

  const handleCommentSubmit = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: "You",
        username: "username",
        avatar: "/placeholder.svg?height=40&width=40&text=YP",
      },
      content,
      timestamp: "Just now",
    }

    setComments([...comments, newComment])
    setShowCommentInput(false)
    toast.success("Comment added", {
      position: "bottom-center",
      duration: 2000
    })
  }

  const toggleComments = () => {
    setShowComments(!showComments)
    if (!showComments && !showCommentInput) {
      setShowCommentInput(true)
    }
  }

  return (
    <Card className="mb-6 overflow-hidden relative">
      {post.sponsored && (
        <Badge variant="outline" className="absolute top-2 right-2 z-10 bg-background/80">
          Sponsored
        </Badge>
      )}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{post.author.name}</span>
              {post.isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-blue-500">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Verified Account</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
          <span className="sr-only">More options</span>
        </Button>
      </div>

      <div className={`relative ${post.content.aspectRatio === "video" ? "aspect-video" : "aspect-square"}`}>
        <Image src={post.content.image || "/placeholder.svg"} alt="Post content" fill className="object-cover" />
        {post.content.aspectRatio === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleComments}>
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            <span className="sr-only">Save</span>
          </Button>
        </div>

        <div className="text-sm">
          <div className="flex gap-3 mb-2">
            {likesCount > 0 && <p className="font-medium">{likesCount.toLocaleString()} likes</p>}
            {savesCount > 0 && <p className="font-medium text-muted-foreground">{savesCount.toLocaleString()} saves</p>}
          </div>
          <p className="mb-1">
            <span className="font-medium">{post.author.username}</span> {post.content.text}
          </p>
          <p className="text-xs text-muted-foreground mb-2">{post.timestamp}</p>

          {comments.length > 0 && !showComments && (
            <button className="text-muted-foreground hover:text-foreground transition-colors" onClick={toggleComments}>
              View all {comments.length} comments
            </button>
          )}

          {showComments && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Comments ({comments.length})</h4>
                {!showCommentInput && (
                  <Button variant="ghost" size="sm" onClick={() => setShowCommentInput(true)}>
                    Add comment
                  </Button>
                )}
              </div>

              <ScrollArea className="max-h-[200px] pr-4">
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs">{comment.author.username}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {showCommentInput && (
                <CommentWindow
                  onSubmit={handleCommentSubmit}
                  onCancel={() => setShowCommentInput(false)}
                  placeholder="Add a comment..."
                  showAvatar={false}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}


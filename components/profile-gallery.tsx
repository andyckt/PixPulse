"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Play, ImageIcon, Bookmark, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryPost {
  id: number
  image: string
  likes: number
  comments: number
  isVideo?: boolean
  isMulti?: boolean
  isSaved?: boolean
  date?: string
}

interface ProfileGalleryProps {
  posts: GalleryPost[]
  emptyMessage?: {
    icon: React.ReactNode
    title: string
    description: string
  }
  onPostClick?: (post: GalleryPost) => void
}

export function ProfileGallery({ 
  posts, 
  emptyMessage,
  onPostClick 
}: ProfileGalleryProps) {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  if (posts.length === 0 && emptyMessage) {
    return (
      <div className="col-span-3 py-16 text-center">
        <div className="mb-4">
          {emptyMessage.icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{emptyMessage.title}</h3>
        <p className="text-muted-foreground">{emptyMessage.description}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="aspect-square relative group cursor-pointer"
          onMouseEnter={() => setHoveredPost(post.id)}
          onMouseLeave={() => setHoveredPost(null)}
          onClick={() => onPostClick?.(post)}
        >
          <Image
            src={post.image}
            alt={`Post ${post.id}`}
            fill
            className="object-cover"
          />
          
          {/* Post type indicator */}
          {(post.isVideo || post.isMulti || post.isSaved) && (
            <div className="absolute top-2 right-2 text-white">
              {post.isVideo && <Play className="h-5 w-5 drop-shadow-md" />}
              {post.isMulti && <ImageIcon className="h-5 w-5 drop-shadow-md" />}
              {post.isSaved && <Bookmark className="h-5 w-5 drop-shadow-md fill-white" />}
            </div>
          )}
          
          {/* Hover overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center",
              hoveredPost === post.id && "opacity-100"
            )}
          >
            <div className="flex items-center gap-6 text-white font-semibold">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2 fill-white" />
                <span>{formatNumber(post.likes)}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 fill-white" />
                <span>{formatNumber(post.comments)}</span>
              </div>
            </div>
            
            {post.date && (
              <div className="flex items-center text-white/80 text-sm mt-2">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.date}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 
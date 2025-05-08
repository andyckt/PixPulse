"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface FriendSuggestionItemProps {
  suggestion: {
    id: string
    username: string
    name: string
    avatar: string
    isVerified?: boolean
    mutualFriends?: number
    suggestedReason?: string
    popularityScore?: number
    tags?: string[]
  }
}

export function FriendSuggestionItem({ suggestion }: FriendSuggestionItemProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  
  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false)
      toast.success("Friend request canceled", {
        position: "bottom-center"
      })
    } else {
      setIsFollowing(true)
      toast.success("Friend request sent", {
        description: "They'll be notified of your request",
        position: "bottom-center"
      })
    }
  }
  
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={suggestion.avatar} alt={suggestion.name} className="object-cover" />
          <AvatarFallback>{suggestion.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-medium">{suggestion.name}</p>
            {suggestion.isVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
            {suggestion.popularityScore && suggestion.popularityScore > 90 && (
              <Badge className="ml-1 bg-orange-50 text-orange-700 border-orange-200 text-[10px] px-1">
                <Sparkles className="h-3 w-3 mr-1" /> Popular
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">@{suggestion.username}</p>
          {suggestion.suggestedReason && (
            <p className="text-xs mt-1">{suggestion.suggestedReason}</p>
          )}
        </div>
      </div>
      
      <Button 
        size="sm" 
        variant={isFollowing ? "outline" : "default"}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Pending" : "Follow"}
      </Button>
    </div>
  )
} 
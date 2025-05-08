"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BadgeCheck, 
  MessageSquare, 
  MoreHorizontal,
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface FriendListItemProps {
  friend: {
    id: string
    username: string
    name: string
    avatar: string
    isVerified?: boolean
    mutualFriends?: number
    lastActive?: string
    status?: string
    isCloseFriend?: boolean
    online?: boolean
  }
  onProfileOpen?: (friend: any) => void
}

export function FriendListItem({ friend, onProfileOpen }: FriendListItemProps) {
  const [isCloseFriend, setIsCloseFriend] = useState(friend.isCloseFriend || false)
  
  const handleAddToCloseFriends = () => {
    setIsCloseFriend(true)
    toast.success("Added to close friends", {
      position: "bottom-center"
    })
  }
  
  const handleRemoveFromCloseFriends = () => {
    setIsCloseFriend(false)
    toast.success("Removed from close friends", {
      position: "bottom-center"
    })
  }
  
  const handleUnfollow = () => {
    toast.success("Friend removed", {
      description: "You've unfollowed this user",
      position: "bottom-center"
    })
  }
  
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarImage src={friend.avatar} alt={friend.name} className="object-cover" />
            <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {friend.online && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background bg-green-400" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-medium">{friend.name}</p>
            {friend.isVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
            {isCloseFriend && (
              <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 border-green-200 text-[10px] px-1">
                Close Friend
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-xs text-muted-foreground">@{friend.username}</p>
            {friend.mutualFriends && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">{friend.mutualFriends} mutual friends</p>
              </>
            )}
          </div>
          {friend.status && (
            <p className="text-xs mt-1 text-muted-foreground">{friend.status}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onProfileOpen?.(friend)}>
              View Profile
            </DropdownMenuItem>
            {isCloseFriend ? (
              <DropdownMenuItem onClick={handleRemoveFromCloseFriends}>
                Remove from Close Friends
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleAddToCloseFriends}>
                Add to Close Friends
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleUnfollow} className="text-red-500">
              Unfollow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface FriendRequestItemProps {
  request: {
    id: string
    username: string
    name: string
    avatar: string
    requestedAt: string
    mutualFriends: number
  }
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
}

export function FriendRequestItem({ request, onAccept, onReject }: FriendRequestItemProps) {
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending")
  
  const handleAccept = () => {
    setStatus("accepted")
    toast.success("Friend request accepted", {
      description: "You are now friends",
      position: "bottom-center"
    })
    onAccept?.(request.id)
  }
  
  const handleReject = () => {
    setStatus("rejected")
    toast.success("Friend request declined", {
      position: "bottom-center"
    })
    onReject?.(request.id)
  }
  
  // If the request has been handled, don't show it
  if (status !== "pending") {
    return null
  }
  
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={request.avatar} alt={request.name} className="object-cover" />
          <AvatarFallback>{request.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{request.name}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <p>@{request.username}</p>
            <span className="mx-1">•</span>
            <p>{request.mutualFriends} mutual friends</p>
            <span className="mx-1">•</span>
            <p>Requested {request.requestedAt}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="outline" size="sm" onClick={handleReject}>
          Decline
        </Button>
      </div>
    </div>
  )
} 
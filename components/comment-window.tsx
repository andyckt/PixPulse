"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface CommentWindowProps {
  placeholder?: string
  onSubmit?: (comment: string) => void
  onCancel?: () => void
  showAvatar?: boolean
}

export function CommentWindow({
  placeholder = "Write a comment...",
  onSubmit,
  onCancel,
  showAvatar = true,
}: CommentWindowProps) {
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment)
      setComment("")
    }
  }

  const handleCancel = () => {
    setComment("")
    onCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
    // Cancel on Escape
    if (e.key === "Escape") {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <div className="flex gap-3">
          {showAvatar && (
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop" alt="Your avatar" className="object-cover" />
              <AvatarFallback>YP</AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder={placeholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none focus-visible:ring-1"
              aria-label="Comment text"
            />
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={handleCancel} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={!comment.trim()}>
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">Press Ctrl+Enter to send, Esc to cancel</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


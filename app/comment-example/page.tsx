"use client"

import { useState } from "react"
import { CommentWindow } from "@/components/comment-window"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
}

export default function CommentExamplePage() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      content: "This is a great post! I really enjoyed reading it.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      content: "Thanks for sharing this information, it's very helpful.",
      timestamp: "1 hour ago",
    },
  ])

  const handleCommentSubmit = (comment: string) => {
    const newComment = {
      id: comments.length + 1,
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40&text=YP",
      content: comment,
      timestamp: "Just now",
    }

    setComments([...comments, newComment])
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Comment Example</h1>
        </div>

        <div className="max-w-2xl mx-auto w-full p-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Comment Window Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <CommentWindow onSubmit={handleCommentSubmit} placeholder="Add a comment..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


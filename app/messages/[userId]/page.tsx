"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { 
  Camera, 
  CheckCheck, 
  ImageIcon, 
  Info, 
  Mic, 
  MoreHorizontal, 
  PaperclipIcon, 
  PhoneCall, 
  Send, 
  Smile, 
  VideoIcon,
  ArrowLeft
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock data for users
const users = {
  user1: {
    id: "user1",
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    online: true,
    lastSeen: null
  },
  user2: {
    id: "user2",
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    online: true,
    lastSeen: null
  },
  user3: {
    id: "user3",
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    online: false,
    lastSeen: "Today at 3:45 PM"
  },
  user4: {
    id: "user4",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    online: true,
    lastSeen: null
  },
  user5: {
    id: "user5",
    name: "Nina Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    online: false,
    lastSeen: "Yesterday at 10:20 AM"
  }
};

// Messages for each chat
const chatMessages = {
  user1: [
    { 
      id: "m1", 
      sender: "user1", 
      text: "Hey there! Just wanted to know what you think about my latest photo series from Iceland?", 
      time: "10:22 AM",
      status: "read" 
    },
    { 
      id: "m2", 
      sender: "me", 
      text: "I just checked them out! The composition in that waterfall shot is absolutely stunning. How did you manage to capture that lighting?", 
      time: "10:25 AM",
      status: "read" 
    },
    { 
      id: "m3", 
      sender: "user1", 
      text: "Thanks! It was actually taken at sunrise - we hiked up there at 4am to catch the golden hour. Totally worth it though!", 
      time: "10:30 AM", 
      status: "read" 
    },
    { 
      id: "m4", 
      sender: "user1", 
      text: "I'm thinking of creating a tutorial on my editing process. Do you think people would be interested?", 
      time: "10:31 AM",
      status: "read" 
    },
    { 
      id: "m5", 
      sender: "me", 
      text: "Definitely! Your color grading is always on point. I'd watch it for sure, and I bet a lot of our followers would too.", 
      time: "10:35 AM", 
      status: "read" 
    },
    { 
      id: "m6", 
      sender: "user1", 
      text: "That's great to hear! I'll start working on it this weekend then. I've also been experimenting with some new techniques I'd like to share.", 
      time: "10:40 AM",
      status: "read" 
    },
    { 
      id: "m7", 
      sender: "user1", 
      text: "I just uploaded a new photo series! Would love your feedback 📸", 
      time: "11:22 AM",
      status: "delivered" 
    }
  ],
  user2: [
    { 
      id: "m1", 
      sender: "user2", 
      text: "Hey, have you seen the latest trend on PixPulse?", 
      time: "Yesterday", 
      status: "read" 
    },
    { 
      id: "m2", 
      sender: "me", 
      text: "Not yet, what's happening?", 
      time: "Yesterday", 
      status: "read" 
    },
    { 
      id: "m3", 
      sender: "user2", 
      text: "Everyone's posting their #DayInTheLife photo stories and they're getting massive engagement", 
      time: "Yesterday", 
      status: "read" 
    },
    { 
      id: "m4", 
      sender: "user2", 
      text: "Did you see the new trending hashtags? #PixPulse is on fire!", 
      time: "1 hour ago", 
      status: "delivered" 
    }
  ],
  user3: [
    { 
      id: "m1", 
      sender: "me", 
      text: "That nature reserve location you recommended was perfect for the shoot!", 
      time: "3 days ago", 
      status: "read" 
    },
    { 
      id: "m2", 
      sender: "user3", 
      text: "So glad you liked it! Did you check out the waterfall section?", 
      time: "3 days ago", 
      status: "read" 
    },
    { 
      id: "m3", 
      sender: "me", 
      text: "Yes! Got some amazing long exposure shots there. I'll share them with you once I'm done editing.", 
      time: "2 days ago", 
      status: "read" 
    },
    { 
      id: "m4", 
      sender: "user3", 
      text: "Let's meet up this weekend for that photo walk we discussed!", 
      time: "3 hours ago", 
      status: "delivered" 
    }
  ],
  user4: [
    { 
      id: "m1", 
      sender: "user4", 
      text: "Your latest portrait series is incredible. The lighting is perfect.", 
      time: "1 day ago", 
      status: "read" 
    },
    { 
      id: "m2", 
      sender: "me", 
      text: "Thank you! I've been practicing a lot with different lighting setups.", 
      time: "1 day ago", 
      status: "read" 
    },
    { 
      id: "m3", 
      sender: "user4", 
      text: "How did you achieve that lighting effect in your last post?", 
      time: "1 day ago", 
      status: "delivered" 
    }
  ],
  user5: [
    { 
      id: "m1", 
      sender: "user5", 
      text: "I mentioned your profile in my latest story about inspirational photographers!", 
      time: "2 days ago", 
      status: "read" 
    },
    { 
      id: "m2", 
      sender: "me", 
      text: "That's so kind of you! I really appreciate the shoutout.", 
      time: "2 days ago", 
      status: "read" 
    },
    { 
      id: "m3", 
      sender: "user5", 
      text: "No problem at all! Your work deserves recognition.", 
      time: "2 days ago", 
      status: "read" 
    },
    { 
      id: "m4", 
      sender: "user5", 
      text: "Thanks for the shoutout on your story! Really appreciate it", 
      time: "2 days ago", 
      status: "delivered" 
    }
  ]
};

interface ConversationPageProps {
  params: {
    userId: string
  }
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const { userId } = params
  const router = useRouter()
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const user = users[userId as keyof typeof users]
  const messages = chatMessages[userId as keyof typeof chatMessages] || []

  // Simulate typing indicator for certain users
  useEffect(() => {
    if (userId === 'user1') {
      const typingTimeout = setTimeout(() => {
        setIsTyping(true)
        
        // Stop typing after a few seconds
        setTimeout(() => {
          setIsTyping(false)
        }, 5000)
      }, 2000)
      
      return () => clearTimeout(typingTimeout)
    }
  }, [userId])

  // Auto scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newMessage.trim() === "") return
    
    // Here you would normally send the message to your backend
    // For this demo, we'll just show a toast notification
    toast.success("Message sent!", {
      description: "Your message was delivered successfully",
      position: "bottom-right",
    })
    
    setNewMessage("")
  }

  // If user not found
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Conversation not found</h1>
          <p className="text-muted-foreground mb-4">This conversation doesn't exist or has been deleted.</p>
          <Button asChild>
            <Link href="/messages">Back to Messages</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-3 border-b flex items-center justify-between sticky top-0 bg-background z-10">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => router.push('/messages')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-medium">{user.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {user.online ? "Active now" : `Last seen ${user.lastSeen}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voice call</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <VideoIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Video call</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Conversation info</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map(message => (
              <div 
                key={message.id}
                className={cn(
                  "flex items-start gap-2 max-w-[80%]",
                  message.sender === "me" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {message.sender !== "me" && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "p-3 rounded-lg",
                  message.sender === "me" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1",
                    message.sender === "me" ? "justify-end" : ""
                  )}>
                    <p className="text-xs opacity-70">{message.time}</p>
                    {message.sender === "me" && (
                      <CheckCheck className={cn(
                        "h-3 w-3", 
                        message.status === "read" ? "text-blue-500" : "opacity-70"
                      )} />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2 max-w-[80%]">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "100ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "200ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" type="button" className="rounded-full">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Attach files</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <ImageIcon className="h-6 w-6" />
                      <span>Gallery</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Camera className="h-6 w-6" />
                      <span>Camera</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Textarea 
                placeholder="Type a message..." 
                className="flex-1 min-h-10 max-h-32 py-2 px-4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
              />
              <Button variant="ghost" size="icon" type="button" className="rounded-full">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" type="button" className="rounded-full">
                <Mic className="h-5 w-5" />
              </Button>
              <Button size="icon" type="submit" className="rounded-full">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Messages are end-to-end encrypted. No one outside of this chat can read them.
            </p>
          </form>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
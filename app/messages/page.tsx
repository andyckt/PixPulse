"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bell, 
  Camera, 
  CheckCheck, 
  ChevronDown, 
  FileImage, 
  ImageIcon, 
  Info, 
  Mic, 
  MoreHorizontal, 
  PaperclipIcon, 
  PenBox, 
  PhoneCall, 
  Search, 
  Send, 
  Smile, 
  VideoIcon,
  MessageSquare
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("user1")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock data for conversations
  const conversations = [
    {
      id: "user1",
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      lastMessage: "I just uploaded a new photo series! Would love your feedback 📸",
      time: "2m",
      unread: 2,
      online: true,
      isTyping: true
    },
    {
      id: "user2",
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      lastMessage: "Did you see the new trending hashtags? #PixPulse is on fire!",
      time: "1h",
      unread: 0,
      online: true,
      isTyping: false
    },
    {
      id: "user3",
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
      lastMessage: "Let's meet up this weekend for that photo walk we discussed!",
      time: "3h",
      unread: 0,
      online: false,
      isTyping: false
    },
    {
      id: "user4",
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
      lastMessage: "How did you achieve that lighting effect in your last post?",
      time: "1d",
      unread: 0,
      online: true,
      isTyping: false
    },
    {
      id: "user5",
      name: "Nina Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      lastMessage: "Thanks for the shoutout on your story! Really appreciate it",
      time: "2d",
      unread: 0,
      online: false,
      isTyping: false
    }
  ]

  // Messages for the active chat
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
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get active conversation
  const activeConversation = conversations.find(conv => conv.id === activeChat)

  // Auto scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, chatMessages])

  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(activeConversation?.isTyping || false)
    }, 1000)
    
    return () => clearTimeout(typingTimeout)
  }, [activeChat, activeConversation?.isTyping])

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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="p-4 border-b sticky top-0 z-10 backdrop-blur-md bg-background/90">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Messages</h1>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <PenBox className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>New message</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)]">
              <div className="p-2">
                <div className="space-y-1 mt-1">
                  {filteredConversations.map(conversation => (
                    <button 
                      key={conversation.id}
                      className={cn(
                        "w-full text-left flex items-center gap-3 p-3 rounded-md transition-colors",
                        activeChat === conversation.id 
                          ? "bg-muted/50" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => {
                        // On mobile, navigate to conversation page
                        if (window.innerWidth < 768) {
                          router.push(`/messages/${conversation.id}`)
                        } else {
                          // On desktop, update active chat
                          setActiveChat(conversation.id)
                        }
                      }}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar} alt={conversation.name} className="object-cover" />
                          <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            "text-sm font-medium",
                            conversation.unread > 0 ? "font-semibold" : ""
                          )}>
                            {conversation.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{conversation.time}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {conversation.isTyping ? (
                            <p className="text-xs text-primary truncate">Typing...</p>
                          ) : (
                            <p className={cn(
                              "text-xs truncate",
                              conversation.unread > 0 
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground"
                            )}>
                              {conversation.lastMessage}
                            </p>
                          )}
                          {conversation.unread > 0 && (
                            <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {activeConversation ? (
            <div className="flex flex-col h-full">
              <div className="p-3 border-b flex items-center justify-between sticky top-0 bg-background z-10">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} className="object-cover" />
                    <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium">{activeConversation.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.online ? "Active now" : "Last seen recently"}
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
                  {chatMessages[activeChat as keyof typeof chatMessages]?.map(message => (
                    <div 
                      key={message.id}
                      className={cn(
                        "flex items-start gap-2 max-w-[80%]",
                        message.sender === "me" ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      {message.sender !== "me" && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} className="object-cover" />
                          <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
                        <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} className="object-cover" />
                        <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="max-w-md">
                <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                <p className="text-muted-foreground mb-6">
                  Send private messages to friends and collaborators about your photos, ideas and inspirations.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PenBox className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <label className="text-sm font-medium">To:</label>
                      <Input className="mt-1" placeholder="Search for people..." />
                      <div className="mt-4 space-y-2">
                        {conversations.map(user => (
                          <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


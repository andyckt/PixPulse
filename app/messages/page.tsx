import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PenBox, Send } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold">Conversations</h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <PenBox className="h-5 w-5" />
                <span className="sr-only">New message</span>
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)]">
              <div className="p-2">
                <Input placeholder="Search messages" className="mb-2" />
                <div className="space-y-1 mt-3">
                  {/* Active conversation */}
                  <Link href="/messages">
                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">2m</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">Hey, how are you doing today?</p>
                      </div>
                    </div>
                  </Link>

                  {/* Other conversations */}
                  <Link href="/messages">
                    <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Jane Smith</p>
                          <p className="text-xs text-muted-foreground">1h</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          Did you see the new post? It's amazing!
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/messages">
                    <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>RJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Robert Johnson</p>
                          <p className="text-xs text-muted-foreground">1d</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">Let's meet up this weekend for coffee</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/messages">
                    <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Emily Wilson</p>
                          <p className="text-xs text-muted-foreground">2d</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">Thanks for the help with the project!</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">Hey, how are you doing today?</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback>YP</AvatarFallback>
                  </Avatar>
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <p className="text-sm">
                      I'm doing great! Just checking out this new PixPulse app. It's pretty cool!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">Yeah, I've been using it too. The interface is really nice and clean.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">Have you tried the Crystal Ball feature yet?</p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form className="flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" type="submit">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}


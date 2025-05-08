"use client"

import Link from "next/link"
import { Compass, Home, MessageCircle, SnowflakeIcon as Crystal, Users, Bell, Bookmark, Settings, LogOut, PlusCircle } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { PasswordResetDialog } from "./password-reset-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

export default function Sidebar() {
  const pathname = usePathname()
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { name: "Safari", path: "/", icon: <Home className="mr-2 h-5 w-5" /> },
    { name: "Explore", path: "/voices", icon: <Compass className="mr-2 h-5 w-5" /> },
    { name: "Messages", path: "/messages", icon: <MessageCircle className="mr-2 h-5 w-5" /> },
    { name: "Friends", path: "/friends", icon: <Users className="mr-2 h-5 w-5" /> },
    { name: "Crystal Ball", path: "/crystal-ball", icon: <Crystal className="mr-2 h-5 w-5" /> },
    { name: "Notifications", path: "/activity", icon: <Bell className="mr-2 h-5 w-5" /> },
    { name: "Saved", path: "/saved", icon: <Bookmark className="mr-2 h-5 w-5" /> },
  ]

  return (
    <>
      <div className={cn(
        "hidden md:flex flex-col border-r transition-all duration-300 bg-background z-30 h-screen sticky top-0",
        isCollapsed ? "w-[70px]" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">PixPulse</h1>}
          {isCollapsed && <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">P</div>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" />
              </svg>
            )}
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col justify-between py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center py-3 px-3 rounded-md text-sm font-medium transition-colors relative group",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <span className={cn(
                    "absolute left-0 w-1 rounded-r-full transition-all duration-300 h-full opacity-0",
                    isActive && "opacity-100 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500"
                  )}/>
                  
                  <span className="flex items-center">
                    {item.icon}
                    {!isCollapsed && (
                      <span>{item.name}</span>
                    )}
                  </span>
                  
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}

            <Link 
              href="/create" 
              className={cn(
                "flex items-center py-3 px-3 mt-6 rounded-md font-medium transition-colors",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <div className={cn(
                "flex items-center justify-center text-white font-medium",
                isCollapsed ? "w-10 h-10" : "w-full py-2 px-4"
              )}>
                <div className={cn(
                  "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center",
                  isCollapsed ? "p-2" : "px-4 py-2 w-full"
                )}>
                  <PlusCircle className={cn(
                    "h-5 w-5",
                    !isCollapsed && "mr-2"
                  )} />
                  {!isCollapsed && <span>Create</span>}
                </div>
              </div>
            </Link>
          </nav>

          {/* User section */}
          <div className="mt-auto px-3">
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between mb-4">
              <Link 
                href="/settings" 
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-primary hover:bg-primary/5",
                  isCollapsed && "justify-center"
                )}
              >
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Settings</span>}
              </Link>
              
              <ThemeToggle />
            </div>
            
            <Link href="/profile" className={cn(
              "flex items-center p-2 rounded-md hover:bg-muted/50 transition-colors",
              isCollapsed && "flex-col"
            )}>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              
              {!isCollapsed && (
                <div className="ml-2 flex-1 min-w-0">
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-xs text-muted-foreground truncate">@username</p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Auth Dialog Components */}
      <Dialog>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Sign in to your account or create a new one</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="signin" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button className="w-full">Sign In</Button>
              <div className="text-center text-sm">
                <button className="text-primary hover:underline" onClick={() => setIsPasswordResetOpen(true)}>
                  Forgot password?
                </button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="new-username">Username</Label>
                <Input id="new-username" placeholder="Choose a username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input id="new-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password</Label>
                <Input id="new-password" type="password" placeholder="Create a password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button className="w-full">Sign Up</Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <PasswordResetDialog open={isPasswordResetOpen} onOpenChange={setIsPasswordResetOpen} />
    </>
  )
}


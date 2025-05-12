"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Bookmark, 
  Camera, 
  Cog, 
  Flame, 
  Image as ImageIcon, 
  Mic, 
  Music, 
  Plus, 
  RefreshCw, 
  Search, 
  Send, 
  Sparkles, 
  Sun, 
  Tv2, 
  Upload, 
  Video,
  X
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading state while determining where to redirect
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}


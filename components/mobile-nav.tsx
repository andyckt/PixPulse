"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Compass, Home, MessageCircle, Plus, SnowflakeIcon as Crystal, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function MobileNav() {
  const pathname = usePathname()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const navItems = [
    { path: "/", icon: <Home className="h-5 w-5" />, activeIcon: <Home className="h-5 w-5 fill-current" />, label: "Safari" },
    { path: "/explore", icon: <Compass className="h-5 w-5" />, activeIcon: <Compass className="h-5 w-5 fill-current" />, label: "Explore" },
    { path: "/create", icon: <Plus className="h-6 w-6" />, activeIcon: <Plus className="h-6 w-6" />, label: "Create", isSpecial: true },
    { path: "/messages", icon: <MessageCircle className="h-5 w-5" />, activeIcon: <MessageCircle className="h-5 w-5 fill-current" />, label: "Messages" },
    {
      path: "/profile",
      icon: <User className="h-5 w-5" />,
      activeIcon: <User className="h-5 w-5 fill-current" />,
      label: "Profile",
    },
  ]

  // Handle scroll behavior to hide/show the navigation bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      // Only hide when scrolling down and beyond 100px from top
      if (isScrollingDown && currentScrollPos > 100) {
        setVisible(false);
      } else if (isScrollingUp) {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-background/90 border-t p-2"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-2",
              item.isSpecial ? "relative -mt-5" : ""
            )}
          >
            {item.isSpecial ? (
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-0.5 rounded-full">
                  <div className="bg-background rounded-full p-2">
                    {item.icon}
                  </div>
                </div>
                <span className="text-[10px] mt-1">{item.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-1">
                {pathname === item.path ? item.activeIcon : item.icon}
                <span 
                  className={cn(
                    "text-[10px]",
                    pathname === item.path ? "font-medium" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                {pathname === item.path && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="h-1 w-1 rounded-full bg-current"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}


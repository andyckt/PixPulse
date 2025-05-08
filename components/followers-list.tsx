"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search, X, Hexagon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  isVerified?: boolean
  isFollowing?: boolean
}

interface FollowersListProps {
  followers: User[]
  following: User[]
  onClose?: () => void
  onFollowToggle?: (userId: string, isFollowing: boolean) => void
}

export function FollowersList({ 
  followers, 
  following, 
  onClose,
  onFollowToggle 
}: FollowersListProps) {
  const [activeTab, setActiveTab] = useState<string>("followers")
  const [searchQuery, setSearchQuery] = useState("")
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>(() => {
    const initialStatus: Record<string, boolean> = {};
    
    // Initialize from followers
    followers.forEach(user => {
      initialStatus[user.id] = user.isFollowing || false;
    });
    
    // Initialize from following
    following.forEach(user => {
      initialStatus[user.id] = true; // If they're in following, you're following them
    });
    
    return initialStatus;
  });

  const filteredFollowers = followers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFollowing = following.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = (userId: string) => {
    const newStatus = !followStatus[userId];
    setFollowStatus(prev => ({
      ...prev,
      [userId]: newStatus
    }));
    onFollowToggle?.(userId, newStatus);
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-md">
      <div className="flex items-center justify-between p-4 border-b">
        <Tabs 
          defaultValue="followers" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-0">
            <TabsTrigger value="followers">
              Followers ({followers.length})
            </TabsTrigger>
            <TabsTrigger value="following">
              Following ({following.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1.5 h-7 w-7" 
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <TabsContent value="followers" className="flex-1 p-0 m-0">
        <ScrollArea className="flex-1 h-[calc(80vh-130px)]">
          <div className="p-4 space-y-4">
            {filteredFollowers.length > 0 ? (
              filteredFollowers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        {user.isVerified && (
                          <Hexagon className="h-3.5 w-3.5 text-blue-500 fill-blue-100" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  
                  {followStatus[user.id] ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFollowToggle(user.id)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleFollowToggle(user.id)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? (
                  <p>No users found matching "{searchQuery}"</p>
                ) : (
                  <p>No followers yet</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="following" className="flex-1 p-0 m-0">
        <ScrollArea className="flex-1 h-[calc(80vh-130px)]">
          <div className="p-4 space-y-4">
            {filteredFollowing.length > 0 ? (
              filteredFollowing.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        {user.isVerified && (
                          <Hexagon className="h-3.5 w-3.5 text-blue-500 fill-blue-100" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFollowToggle(user.id)}
                  >
                    Following
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? (
                  <p>No users found matching "{searchQuery}"</p>
                ) : (
                  <p>Not following anyone yet</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </div>
  );
} 
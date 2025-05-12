"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils";

interface ProfileInfoProps {
  isCurrentUser?: boolean;
}

export function ProfileInfo({ isCurrentUser = false }: ProfileInfoProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Format the date (using userid property from authService.UserProfile)
  const formattedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.profile_picture} alt={user.username} />
          <AvatarFallback className="text-xl">{getInitials(user.username)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <CardTitle className="text-2xl">{user.username}</CardTitle>
          <CardDescription>
            {user.bio || "No bio yet"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email:</span>
          <span>{user.email}</span>
        </div>
        {user.phone_no && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span>{user.phone_no}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">User ID:</span>
          <span>{user.userid}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Joined:</span>
          <span>{formattedDate}</span>
        </div>
      </CardContent>
      {isCurrentUser && (
        <CardFooter className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => router.push("/profile/edit")}
          >
            Edit Profile
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 
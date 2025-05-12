"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";

export function AuthNav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-destructive hover:text-destructive"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
} 
import { Login } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - PixPulse",
  description: "Login to your PixPulse account",
};

export default function LoginPage() {
  return <Login />;
} 
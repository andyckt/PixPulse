import { Register } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - PixPulse",
  description: "Create a new PixPulse account",
};

export default function RegisterPage() {
  return <Register />;
} 
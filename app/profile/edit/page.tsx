"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Image as ImageIcon, MapPin, AtSign, Globe, Briefcase, User, Shield, Settings, Upload } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

// Mock profile data for demonstration
const PROFILE_DATA = {
  username: "johndoe",
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Digital creator | Photographer | Traveler | Coffee enthusiast 📸 ✈️ ☕",
  website: "https://johndoe.com",
  location: "New York, NY",
  work: "Designer at CreativeCo",
  gender: "Male",
  birthday: "1990-05-15",
  phone: "+1 (555) 123-4567"
}

export default function EditProfilePage() {
  const [formData, setFormData] = useState(PROFILE_DATA)
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // We would redirect or show success message here
    }, 1500)
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-3xl mx-auto w-full p-4">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your profile information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="basic">
                  <User className="h-4 w-4 mr-2" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="details">
                  <Settings className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your basic profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="w-28 h-28 border-2 border-muted">
                          <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&q=80&fit=crop" alt="John Doe profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <Button type="button" variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Change Photo
                          </Button>
                          <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="flex">
                              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                                <AtSign className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input 
                                id="username" 
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="min-h-[100px]"
                          />
                          <p className="text-sm text-muted-foreground">Brief description for your profile. URLs are hyperlinked.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                    <CardDescription>Add more information to your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input 
                            id="website" 
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input 
                            id="location" 
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="work">Work/Occupation</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input 
                            id="work" 
                            name="work"
                            value={formData.work}
                            onChange={handleInputChange}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          defaultValue={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthday">Birthday</Label>
                      <Input 
                        id="birthday" 
                        name="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-muted-foreground">This won't be shown publicly. Confirm your age.</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Connected Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </div>
                            <span>Twitter</span>
                          </div>
                          <Button type="button" variant="outline" size="sm">Connect</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9.83 20.333v-9.167H7.5V8.333h2.33V6.247c0-2.324 1.42-3.58 3.48-3.58.698 0 1.3.05 1.47.074v1.705h-1.01c-.79 0-.943.376-.943.927v1.96h1.89l-.248 2.833h-1.642v9.167H9.83z" />
                              </svg>
                            </div>
                            <span>Facebook</span>
                          </div>
                          <Button type="button" variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control who can see your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Private Account</p>
                          <p className="text-sm text-muted-foreground">Only approved followers can see your content</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Activity Status</p>
                          <p className="text-sm text-muted-foreground">Show when you're active</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-muted-foreground">Allow search engines to index your profile</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mentions</p>
                          <p className="text-sm text-muted-foreground">Control who can mention you in posts</p>
                        </div>
                        <Select defaultValue="everyone">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="following">People I Follow</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Tags</p>
                          <p className="text-sm text-muted-foreground">Approve tags before they appear on your profile</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end gap-2 mt-6">
                <Link href="/profile">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Tabs>
          </form>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
} 
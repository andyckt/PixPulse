import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Camera, ImageIcon, Mic, Video } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CreatePage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="max-w-2xl mx-auto w-full p-4">
          <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="photo" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="photo">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Photo
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="audio">
                    <Mic className="h-4 w-4 mr-2" />
                    Audio
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="photo" className="space-y-6">
                  <CreatePhotoPost />
                </TabsContent>

                <TabsContent value="video" className="space-y-6">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload a video</h3>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop a video file or click to browse</p>
                    <Button>
                      <Video className="h-4 w-4 mr-2" />
                      Select Video
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-caption">Caption</Label>
                      <Textarea id="video-caption" placeholder="Write a caption..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-location">Location</Label>
                      <Input id="video-location" placeholder="Add location" />
                    </div>

                    <Button className="w-full">Share</Button>
                  </div>
                </TabsContent>

                <TabsContent value="audio" className="space-y-6">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload an audio clip</h3>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop an audio file or click to browse</p>
                    <Button>
                      <Mic className="h-4 w-4 mr-2" />
                      Select Audio
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="audio-title">Title</Label>
                      <Input id="audio-title" placeholder="Add a title..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audio-description">Description</Label>
                      <Textarea id="audio-description" placeholder="Write a description..." />
                    </div>

                    <Button className="w-full">Share</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}

function CreatePhotoPost() {
  return (
    <>
      <div className="border-2 border-dashed rounded-lg p-12 text-center">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Upload a photo</h3>
        <p className="text-sm text-muted-foreground mb-4">Drag and drop a photo or click to browse</p>
        <Button>
          <Camera className="h-4 w-4 mr-2" />
          Select Photo
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="photo-caption">Caption</Label>
          <Textarea id="photo-caption" placeholder="Write a caption..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo-location">Location</Label>
          <Input id="photo-location" placeholder="Add location" />
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="relative aspect-square w-full max-w-sm mx-auto border rounded-md overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400&text=Photo+Preview"
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Button className="w-full">Share</Button>
      </div>
    </>
  )
}


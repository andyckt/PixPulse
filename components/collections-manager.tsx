"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, FolderClosed, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Collection {
  id: string
  name: string
  count: number
  isDefault: boolean
  coverImages?: string[]
}

interface CollectionsManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collections: Collection[]
  onCreateCollection: (name: string) => void
  onDeleteCollection: (id: string) => void
  onRenameCollection: (id: string, name: string) => void
}

export function CollectionsManager({
  open,
  onOpenChange,
  collections,
  onCreateCollection,
  onDeleteCollection,
  onRenameCollection
}: CollectionsManagerProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [editCollectionId, setEditCollectionId] = useState<string | null>(null)
  const [editCollectionName, setEditCollectionName] = useState("")
  
  // Handle creating a new collection
  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName.trim())
      setNewCollectionName("")
      setCreateDialogOpen(false)
    } else {
      toast.error("Please enter a collection name", {
        position: "bottom-center",
      })
    }
  }
  
  // Handle opening the edit dialog
  const handleOpenEditDialog = (collection: Collection) => {
    setEditCollectionId(collection.id)
    setEditCollectionName(collection.name)
    setEditDialogOpen(true)
  }
  
  // Handle renaming a collection
  const handleRenameCollection = () => {
    if (editCollectionId && editCollectionName.trim()) {
      onRenameCollection(editCollectionId, editCollectionName.trim())
      setEditDialogOpen(false)
      setEditCollectionId(null)
      setEditCollectionName("")
    } else {
      toast.error("Please enter a collection name", {
        position: "bottom-center",
      })
    }
  }
  
  // Handle deleting a collection
  const handleDeleteCollection = (id: string) => {
    onDeleteCollection(id)
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Collections</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Organize your saved posts with collections
          </p>
          <Button
            size="sm"
            onClick={() => setCreateDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {collections
              .filter(collection => !collection.isDefault)
              .map(collection => (
                <Card key={collection.id} className="overflow-hidden">
                  <div className="relative h-28 bg-muted">
                    {collection.coverImages && collection.coverImages.length > 0 ? (
                      <div className="h-full w-full grid grid-cols-3 gap-0.5">
                        {collection.coverImages.map((imageUrl, index) => (
                          <div key={index} className="relative h-full">
                            <Image
                              src={imageUrl}
                              alt={collection.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        
                        {/* Fill empty slots with placeholders */}
                        {Array.from({ length: Math.max(0, 3 - (collection.coverImages?.length || 0)) }).map((_, index) => (
                          <div key={`placeholder-${index}`} className="bg-muted/80" />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FolderClosed className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80 backdrop-blur-sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEditDialog(collection)}>
                            <Edit2 className="h-3.5 w-3.5 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCollection(collection.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm truncate">{collection.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {collection.count} {collection.count === 1 ? 'post' : 'posts'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="p-3 pt-0">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => onOpenChange(false)}>
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
      
      {/* Create Collection Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new collection</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-collection-name">Collection name</Label>
              <Input 
                id="new-collection-name" 
                placeholder="e.g., Travel Inspiration" 
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateCollection()
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCollection}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Collection Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename collection</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-collection-name">Collection name</Label>
              <Input 
                id="edit-collection-name" 
                placeholder="Collection name" 
                value={editCollectionName}
                onChange={(e) => setEditCollectionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameCollection()
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameCollection}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
} 
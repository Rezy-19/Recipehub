"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data for recipes (same as in recipe-grid.tsx)
const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    image: "/placeholder.svg",
    origin: "Italy, Rome",
    rating: 4.8,
    isFavorite: true,
    createdAt: "2025-02-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    description: "Grilled chunks of chicken in a creamy tomato sauce with Indian spices.",
    image: "/placeholder.svg",
    origin: "United Kingdom (inspired by Indian cuisine)",
    rating: 4.6,
    isFavorite: false,
    createdAt: "2025-02-10T14:45:00Z",
  },
  {
    id: 3,
    name: "Beef Bourguignon",
    description: "A classic French beef stew made with red wine, carrots, onions, and mushrooms.",
    image: "/placeholder.svg",
    origin: "France, Burgundy",
    rating: 4.9,
    isFavorite: true,
    createdAt: "2025-02-05T09:15:00Z",
  },
  {
    id: 4,
    name: "Pad Thai",
    description: "A popular Thai stir-fried noodle dish with a perfect balance of sweet, sour, and savory flavors.",
    image: "/placeholder.svg",
    origin: "Thailand",
    rating: 4.7,
    isFavorite: false,
    createdAt: "2025-01-28T16:20:00Z",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Decadent chocolate dessert with a molten chocolate center.",
    image: "/placeholder.svg",
    origin: "France",
    rating: 4.9,
    isFavorite: true,
    createdAt: "2025-01-20T11:10:00Z",
  },
]

export function AdminRecipeTable() {
  const [recipeList, setRecipeList] = useState(recipes)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDeleteClick = (recipeId: number) => {
    setRecipeToDelete(recipeId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (recipeToDelete) {
      // In a real app, you would call your API here
      // await fetch(`/api/recipes/${recipeToDelete}`, { method: 'DELETE' })

      setRecipeList(recipeList.filter((recipe) => recipe.id !== recipeToDelete))

      toast({
        title: "Recipe deleted",
        description: "The recipe has been deleted successfully.",
      })

      setDeleteDialogOpen(false)
      setRecipeToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipeList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No recipes found.
                </TableCell>
              </TableRow>
            ) : (
              recipeList.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.name}</TableCell>
                  <TableCell>{recipe.origin}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>{recipe.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(recipe.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/edit/${recipe.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(recipe.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this recipe? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { ChefHat, ChevronLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AdminRecipeTable } from "@/components/admin-recipe-table"

export const metadata: Metadata = {
  title: "Admin - RecipeHub",
  description: "Manage recipes in the admin dashboard",
}

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6" />
              <span className="font-bold">RecipeHub</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Recipe Management</h1>
            <Button asChild>
              <Link href="/dashboard/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Recipe
              </Link>
            </Button>
          </div>
          <AdminRecipeTable />
        </div>
      </main>
      <footer className="w-full border-t py-4">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 RecipeHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


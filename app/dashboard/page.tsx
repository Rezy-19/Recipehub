"use client";

import { useState } from "react";
import Link from "next/link";
import { ChefHat, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecipeGrid } from "@/components/recipe-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const handleShowAllRecipes = () => {
    setFilter("all");
  };

  const handleShowFavorites = () => {
    setFilter("favorites");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6" />
              <span className="font-bold">RecipeHub</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/add">Add Recipe</Link>
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Recipes</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={handleShowAllRecipes}
              >
                All Recipes
              </Button>
              <Button
                variant={filter === "favorites" ? "default" : "outline"}
                size="sm"
                onClick={handleShowFavorites}
              >
                Favorites
              </Button>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="mt-6">
            <RecipeGrid filter={filter} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-4">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 RecipeHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

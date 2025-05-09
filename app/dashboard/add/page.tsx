"use client";

import Link from "next/link";
import { ChefHat, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecipeForm } from "@/components/recipe-form";

export default function AddRecipePage() {
  // Redirect to dashboard after adding a recipe
  const handleRecipeAdded = (recipe: any) => {
    window.location.href = "/dashboard";
  };

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage: "url('/images/add-page_x16.png')", // Replace with the correct path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Translucent Header */}
      <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-lg shadow-lg border border-white/10">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6" />
              <span className="font-bold">RecipeHub</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
          <div className="mx-auto max-w-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg shadow-lg border border-white/10 p-6 rounded-lg">
            <h1 className="text-3xl font-bold tracking-tight mb-6">
              Add New Recipe
            </h1>
            <RecipeForm onRecipeAdded={handleRecipeAdded} />
          </div>
        </div>
      </main>

      {/* Translucent Footer */}
      <footer className="w-full border-t py-4 bg-white/10 backdrop-blur-lg shadow-lg border border-white/10">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 RecipeHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

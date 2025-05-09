"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface RecipeModalProps {
  currentRecipe?: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string[];
    origin: string;
    rating: number;
    isFavorite: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({
  currentRecipe,
  isOpen,
  onClose,
}: RecipeModalProps) {
  if (!currentRecipe) {
    return null;
  }

  const [isLiked, setIsLiked] = useState(currentRecipe?.isFavorite || false);
  const [currentRating, setCurrentRating] = useState(
    currentRecipe?.rating || 0
  );

  // Debug logging
  console.log("Recipe data:", currentRecipe);
  console.log("Ingredients:", currentRecipe.ingredients);
  console.log("Instructions:", currentRecipe.instructions);

  const toggleFavorite = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl">{currentRecipe.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={currentRecipe.imageUrl || "/placeholder.svg"}
            alt={currentRecipe.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(currentRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">
                {currentRating.toFixed(1)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
              <span className="sr-only">Favorite</span>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mt-4">
          {currentRecipe.description}
        </p>

        <div className="flex items-center text-sm mt-2">
          <span className="font-medium">Origin:</span>
          <span className="ml-2">{currentRecipe.origin}</span>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="ingredients">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="mt-4">
            {Array.isArray(currentRecipe.ingredients) &&
            currentRecipe.ingredients.length > 0 ? (
              <ul className="space-y-2">
                {currentRecipe.ingredients.map(
                  (ingredient: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{ingredient}</span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-muted-foreground">No ingredients available.</p>
            )}
          </TabsContent>
          <TabsContent value="instructions" className="mt-4">
            {Array.isArray(currentRecipe.instructions) &&
            currentRecipe.instructions.length > 0 ? (
              <ol className="space-y-4">
                {currentRecipe.instructions.map(
                  (instruction: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 font-bold">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            ) : (
              <p className="text-muted-foreground">
                No instructions available.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

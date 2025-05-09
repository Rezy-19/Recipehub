"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RecipeModal } from "@/components/recipe-modal";
import { RegionFilter } from "@/components/region-filter";
import { SearchBar } from "@/components/search-bar";

export function RecipeGrid({ filter }: { filter: "all" | "favorites" }) {
  const [recipes, setRecipes] = useState<any[]>([]); // Stores all recipes
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null); // Stores the recipe for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal open/close state
  const [selectedRegion, setSelectedRegion] = useState("All"); // Tracks selected region
  const [searchQuery, setSearchQuery] = useState(""); // Tracks search query
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    imageUrl: "",
    ingredients: "",
    instructions: "",
    origin: "",
    rating: 0,
    isFavorite: false,
  }); // Tracks the new recipe being added

  // Fetch recipes from the API when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        const data = await res.json();

        if (Array.isArray(data)) {
          setRecipes(data); // Set recipes if the response is valid
        } else {
          console.error("Invalid data format:", data);
          setRecipes([]);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, []);

  // Open the modal and set the selected recipe
  const openRecipeModal = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  // Close the modal and clear the selected recipe
  const closeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  // Toggle the favorite status of a recipe
  const toggleFavorite = (recipeId: any) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe: any) =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  // Add a new recipe to the list dynamically
  const addRecipe = async () => {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) {
        throw new Error("Failed to add recipe");
      }

      const createdRecipe = await res.json();
      setRecipes((prevRecipes) => [...prevRecipes, createdRecipe]); // Add the new recipe to the list
      setNewRecipe({
        title: "",
        description: "",
        imageUrl: "",
        ingredients: "",
        instructions: "",
        origin: "",
        rating: 0,
        isFavorite: false,
      }); // Reset the form
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  // Delete a recipe from the list and the database
  const deleteRecipe = async (recipeId: any) => {
    try {
      console.log("Deleting recipe with ID:", recipeId); // Debugging the recipe ID

      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to delete recipe");
      }

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe: any) => recipe.id !== recipeId)
      ); // Remove the recipe from the list
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter recipes based on the "filter" prop, selected region, and search query
  const filteredRecipes = recipes
    .filter((recipe) => (filter === "favorites" ? recipe.isFavorite : true))
    .filter((recipe) =>
      selectedRegion === "All" ? true : recipe.origin === selectedRegion
    )
    .filter((recipe) => recipe.title.toLowerCase().includes(searchQuery));

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        <RegionFilter onRegionChange={setSelectedRegion} />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            {/* Recipe Image */}
            <div
              className="aspect-video relative cursor-pointer"
              onClick={() => openRecipeModal(recipe)}
            >
              <Image
                src={recipe.imageUrl || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Recipe Content */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {recipe.title}
                </h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm">{recipe.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2 line-clamp-2">
                {recipe.description}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Origin: {recipe.origin}
              </p>
            </CardContent>

            {/* Recipe Actions */}
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openRecipeModal(recipe)}
              >
                View Recipe
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={recipe.isFavorite ? "text-red-500" : ""}
                aria-label="Toggle Favorite"
                onClick={() => toggleFavorite(recipe.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    recipe.isFavorite ? "fill-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete Recipe"
                onClick={() => deleteRecipe(recipe.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          currentRecipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}

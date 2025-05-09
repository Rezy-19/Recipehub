import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

async function fetchAreas() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();
    return data.meals.map((area) => area.strArea) || [];
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
}

async function fetchMealsByArea(area) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for area ${area}:`, error);
    return [];
  }
}

async function fetchMealDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals?.[0];
  } catch (error) {
    console.error(`Error fetching meal details for ID ${id}:`, error);
    return null;
  }
}

async function populateDatabase() {
  // First, fetch all available areas
  const areas = await fetchAreas();
  console.log("Found areas:", areas);

  for (const area of areas) {
    // Fetch meals for each area
    const meals = await fetchMealsByArea(area);
    console.log(`Found ${meals.length} meals for ${area}`);

    for (const meal of meals) {
      try {
        // Fetch full meal details
        const mealDetails = await fetchMealDetails(meal.idMeal);
        if (!mealDetails) continue;

        // Extract ingredients and measures
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealDetails[`strIngredient${i}`];
          const measure = mealDetails[`strMeasure${i}`];
          if (ingredient && measure && ingredient.trim() && measure.trim()) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
          }
        }

        // Split instructions into steps
        const instructions = mealDetails.strInstructions
          .split(/\r\n|\r|\n/)
          .filter((step) => step.trim())
          .map((step) => step.trim());

        await prisma.recipe.create({
          data: {
            title: mealDetails.strMeal,
            description: mealDetails.strInstructions.split(".")[0] + ".", // First sentence as description
            imageUrl: mealDetails.strMealThumb,
            ingredients: JSON.stringify(ingredients),
            instructions: JSON.stringify(instructions),
            rating: Math.random() * 5, // Random rating between 0-5
            isFavorite: false,
            origin: area,
            servings: Math.floor(Math.random() * 8) + 2, // Random servings between 2-10
          },
        });
        console.log(`Added recipe: ${mealDetails.strMeal} (${area})`);
      } catch (error) {
        console.error(`Error adding recipe ${meal.strMeal}:`, error);
      }
    }
  }
}

// Clear existing recipes before populating
async function clearExistingRecipes() {
  try {
    await prisma.recipe.deleteMany({});
    console.log("Cleared existing recipes");
  } catch (error) {
    console.error("Error clearing recipes:", error);
  }
}

clearExistingRecipes()
  .then(() => populateDatabase())
  .catch((error) => {
    console.error("Error populating database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

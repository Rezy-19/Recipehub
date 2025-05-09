import { PrismaClient } from "@prisma/client";
const fetch = require("node-fetch");
const prisma = new PrismaClient();

async function fetchAndPopulate() {
  try {
    console.log("Fetching data from TheMealDB...");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      console.log("No meals found in the API response.");
      return;
    }

    console.log(`Found ${data.meals.length} meals. Populating the database...`);

    for (const meal of data.meals) {
      const ingredients = [];
      const instructions = meal.strInstructions || "";

      // Collect ingredients and measurements
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${measure || ""} ${ingredient}`.trim());
        }
      }

      // Insert the meal into the database
      await prisma.recipe.create({
        data: {
          title: meal.strMeal,
          description: meal.strCategory || "No category",
          imageUrl: meal.strMealThumb || "",
          ingredients: JSON.stringify(ingredients),
          instructions: JSON.stringify(
            instructions.split("\n").filter((line) => line.trim() !== "")
          ),
          rating: 0, // Default rating
          isFavorite: false, // Default favorite status
          origin: meal.strArea || "Unknown",
          servings: 1, // Default servings
        },
      });

      console.log(`Inserted meal: ${meal.strMeal}`);
    }

    console.log("Database population complete!");
  } catch (error) {
    console.error("Error populating the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndPopulate();

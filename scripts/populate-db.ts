const { PrismaClient } = require("@prisma/client");
const fetch = require("node-fetch");

interface Meal {
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strArea: string;
  [key: string]: string | undefined;
}

interface MealResponse {
  meals: Meal[];
}

const prisma = new PrismaClient();

async function fetchMeals() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = (await response.json()) as MealResponse;
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

async function populateDatabase() {
  const meals = await fetchMeals();

  for (const meal of meals) {
    try {
      await prisma.recipe.create({
        data: {
          title: meal.strMeal,
          description: meal.strInstructions,
          imageUrl: meal.strMealThumb,
          ingredients: JSON.stringify({
            ingredients: Array.from({ length: 20 }, (_, i) => ({
              name: meal[`strIngredient${i + 1}`],
              measure: meal[`strMeasure${i + 1}`],
            })).filter((ing) => ing.name && ing.measure),
          }),
          instructions: meal.strInstructions,
          rating: Math.random() * 5, // Random rating between 0-5
          isFavorite: false,
          origin: meal.strArea || "Unknown",
          servings: Math.floor(Math.random() * 8) + 2, // Random servings between 2-10
        },
      });
      console.log(`Added recipe: ${meal.strMeal}`);
    } catch (error) {
      console.error(`Error adding recipe ${meal.strMeal}:`, error);
    }
  }
}

populateDatabase()
  .catch((error) => {
    console.error("Error populating database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

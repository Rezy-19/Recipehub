import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();

    // Parse the JSON strings for each recipe
    const parsedRecipes = recipes.map((recipe) => {
      const {
        ingredients: rawIngredients,
        instructions: rawInstructions,
        ...rest
      } = recipe;

      let ingredients, instructions;
      try {
        ingredients =
          typeof rawIngredients === "string"
            ? JSON.parse(rawIngredients)
            : rawIngredients;
      } catch (e) {
        console.error("Failed to parse ingredients:", e);
        ingredients = [];
      }

      try {
        instructions =
          typeof rawInstructions === "string"
            ? JSON.parse(rawInstructions)
            : rawInstructions;
      } catch (e) {
        console.error("Failed to parse instructions:", e);
        instructions = [];
      }

      return {
        ...rest,
        ingredients,
        instructions,
      };
    });

    return new Response(JSON.stringify(parsedRecipes), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newRecipe = await prisma.recipe.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl || "",
        ingredients: JSON.stringify(body.ingredients),
        instructions: JSON.stringify(body.instructions),
        rating: body.rating || 0,
        isFavorite: body.isFavorite || false,
        origin: body.origin,
        servings: body.servings || 1,
      },
    });

    // Parse the JSON strings before sending the response
    const {
      ingredients: rawIngredients,
      instructions: rawInstructions,
      ...rest
    } = newRecipe;

    const responseData = {
      ...rest,
      ingredients: JSON.parse(rawIngredients),
      instructions: JSON.parse(rawInstructions),
    };

    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Failed to add recipe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

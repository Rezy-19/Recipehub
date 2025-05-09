import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log("Fetching recipe with ID:", id);

    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!recipe) {
      console.log("Recipe not found for ID:", id);
      return new Response(JSON.stringify({ error: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new object without the raw ingredients and instructions
    const {
      ingredients: rawIngredients,
      instructions: rawInstructions,
      ...rest
    } = recipe;

    // Parse the JSON strings
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

    // Create the final response object
    const responseData = {
      ...rest,
      ingredients,
      instructions,
    };

    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipe" }), {
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
        imageUrl: body.imageUrl,
        ingredients: JSON.stringify(body.ingredients), // Always store as JSON
        instructions: JSON.stringify(body.instructions), // Always store as JSON
        rating: body.rating || 0,
        isFavorite: body.isFavorite || false,
        origin: body.origin,
        servings: body.servings || 1,
      },
    });
    return new Response(JSON.stringify(newRecipe), {
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

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: parseInt(id, 10) },
    });

    return new Response(JSON.stringify(deletedRecipe), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete recipe:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to delete recipe" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Helper function to safely parse JSON
function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str; // Return the original string if it's not valid JSON
  }
}

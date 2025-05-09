const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.createMany({
    data: [
      {
        title: "Spaghetti Carbonara",
        description:
          "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
        imageUrl: "/images/spaghetti-carbonara.jpg",
        ingredients: JSON.stringify([
          "350g spaghetti",
          "150g pancetta or guanciale, diced",
          "3 large eggs",
          "50g pecorino romano, grated",
          "50g parmesan, grated",
          "Freshly ground black pepper",
          "Salt to taste",
        ]),
        instructions: JSON.stringify([
          "Bring a large pot of salted water to boil and cook the spaghetti according to package instructions until al dente.",
          "While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 5-7 minutes.",
          "In a bowl, whisk together the eggs, pecorino, parmesan, and a generous amount of black pepper.",
        ]),
        rating: 4.5,
        isFavorite: true,
        origin: "Italy, Rome",
        servings: 4,
      },
      {
        title: "Chicken Curry",
        description: "Spicy and savory chicken curry.",
        imageUrl: "/images/butter-chicken.jpg",
        ingredients: JSON.stringify([
          "Chicken",
          "Curry Powder",
          "Coconut Milk",
        ]),
        instructions: JSON.stringify([
          "Cook chicken.",
          "Add spices.",
          "Simmer with coconut milk.",
        ]),
        rating: 4.5,
        isFavorite: false,
        origin: "India",
        servings: 4,
      },
      {
        title: "Chicken Tikka Masala",
        description:
          "Grilled chunks of chicken in a creamy tomato sauce with Indian spices.",
        imageUrl: "/images/chicken-tikka.jpg",
        ingredients: JSON.stringify([
          "800g boneless chicken thighs, cut into bite-sized pieces",
          "2 cups plain yogurt",
          "3 tbsp lemon juice",
          "4 tsp ground cumin",
          "4 tsp ground coriander",
          "2 tsp ground turmeric",
          "2 tsp garam masala",
          "2 tsp salt",
          "2 tbsp vegetable oil",
          "1 large onion, diced",
          "4 cloves garlic, minced",
          "2 tbsp ginger, grated",
          "2 cups tomato sauce",
          "1 cup heavy cream",
          "Fresh cilantro for garnish",
        ]),
        instructions: JSON.stringify([
          "In a large bowl, combine yogurt, lemon juice, cumin, coriander, turmeric, garam masala, and salt. Add chicken and stir to coat. Cover and refrigerate for at least 1 hour, or overnight.",
          "Preheat grill or broiler. Thread chicken onto skewers and discard marinade. Grill or broil until chicken is cooked through, about 5-7 minutes per side.",
          "Heat oil in a large skillet over medium heat. Add onion and cook until softened, about 5 minutes. Add garlic and ginger and cook for 1 minute more.",
          "Add tomato sauce and bring to a simmer. Cook for 15 minutes, stirring occasionally.",
          "Add grilled chicken and simmer for 10 minutes. Stir in cream and cook until heated through, about 5 minutes.",
          "Garnish with fresh cilantro and serve with rice or naan bread.",
        ]),
        rating: 4.7,
        isFavorite: true,
        origin: "India",
        servings: 4,
      },
      {
        title: "Paneer Tikka",
        description:
          "Chunks of paneer marinated in spices and grilled to perfection.",
        imageUrl: "/images/paneer-tikka.jpg",
        ingredients: JSON.stringify([
          "400g paneer, cut into cubes",
          "1 cup thick yogurt",
          "2 tbsp lemon juice",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "1 tsp cumin powder",
          "Salt to taste",
          "1 onion, cut into chunks",
          "1 bell pepper, cut into chunks",
          "1 tbsp oil",
        ]),
        instructions: JSON.stringify([
          "In a bowl, mix yogurt, lemon juice, ginger-garlic paste, turmeric, chili powder, garam masala, cumin, and salt.",
          "Add paneer cubes, onion, and bell pepper. Marinate for at least 1 hour.",
          "Thread onto skewers and brush with oil.",
          "Grill or bake at 200°C (400°F) for 15-20 minutes, turning occasionally.",
          "Serve hot with mint chutney.",
        ]),
        rating: 4.6,
        isFavorite: false,
        origin: "India",
        servings: 3,
      },
      {
        title: "Masoor Dal (Red Lentil Curry)",
        description:
          "A comforting and protein-rich red lentil curry, flavored with Indian spices.",
        imageUrl: "/images/masoor-dal.jpg",
        ingredients: JSON.stringify([
          "1 cup red lentils (masoor dal)",
          "3 cups water",
          "1 onion, chopped",
          "2 tomatoes, chopped",
          "2 green chilies, chopped",
          "1 tsp cumin seeds",
          "1 tsp turmeric powder",
          "1 tsp garam masala",
          "2 tbsp oil",
          "Salt to taste",
          "Fresh cilantro for garnish",
        ]),
        instructions: JSON.stringify([
          "Rinse lentils and cook with water, turmeric, and salt until soft.",
          "Heat oil in a pan, add cumin seeds, then onion and green chilies. Sauté until golden.",
          "Add tomatoes and cook until soft.",
          "Add garam masala and cooked lentils. Simmer for 5-10 minutes.",
          "Garnish with cilantro and serve with rice or roti.",
        ]),
        rating: 4.5,
        isFavorite: false,
        origin: "India",
        servings: 4,
      },
      {
        title: "Aloo Gobi",
        description:
          "A classic vegetarian dish made with potatoes (aloo) and cauliflower (gobi) cooked with Indian spices.",
        imageUrl: "/images/aloo-gobi.jpg",
        ingredients: JSON.stringify([
          "2 potatoes, peeled and cubed",
          "1 small cauliflower, cut into florets",
          "1 onion, chopped",
          "2 tomatoes, chopped",
          "2 green chilies, chopped",
          "1 tsp cumin seeds",
          "1 tsp turmeric powder",
          "1 tsp coriander powder",
          "1 tsp garam masala",
          "2 tbsp oil",
          "Salt to taste",
          "Fresh cilantro for garnish",
        ]),
        instructions: JSON.stringify([
          "Heat oil in a pan, add cumin seeds, then onion and green chilies. Sauté until golden.",
          "Add tomatoes and cook until soft.",
          "Add potatoes, cauliflower, turmeric, coriander, garam masala, and salt. Mix well.",
          "Cover and cook until vegetables are tender, stirring occasionally.",
          "Garnish with cilantro and serve with roti or rice.",
        ]),
        rating: 4.4,
        isFavorite: false,
        origin: "India",
        servings: 4,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

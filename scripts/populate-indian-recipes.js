import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const indianRecipes = [
  {
    title: "Chicken Tikka Masala",
    description:
      "A classic Indian dish featuring marinated chicken in a creamy tomato sauce with aromatic spices.",
    imageUrl:
      "https://www.thespruceeats.com/thmb/3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-1955604-hero-01-5b6d0c0b46e0fb0050b3c2d4.jpg",
    ingredients: JSON.stringify([
      "1.5 lbs boneless chicken thighs",
      "1 cup plain yogurt",
      "2 tbsp lemon juice",
      "2 tsp ground cumin",
      "2 tsp ground coriander",
      "2 tsp paprika",
      "1 tsp turmeric",
      "1 tsp garam masala",
      "2 tbsp vegetable oil",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 can (14 oz) tomato sauce",
      "1 cup heavy cream",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ]),
    instructions: JSON.stringify([
      "Cut chicken into bite-sized pieces and marinate in yogurt, lemon juice, and spices for at least 2 hours",
      "Heat oil in a large pan and cook onions until soft",
      "Add garlic and ginger, cook for 1 minute",
      "Add marinated chicken and cook until no longer pink",
      "Stir in tomato sauce and simmer for 15 minutes",
      "Add heavy cream and simmer for 5 more minutes",
      "Garnish with fresh cilantro and serve with rice or naan",
    ]),
    rating: 4.8,
    isFavorite: false,
    origin: "Indian",
    servings: 4,
  },
  {
    title: "Vegetable Biryani",
    description:
      "A fragrant rice dish cooked with mixed vegetables and aromatic spices.",
    imageUrl:
      "https://www.thespruceeats.com/thmb/3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegetable-biryani-1955604-hero-01-5b6d0c0b46e0fb0050b3c2d4.jpg",
    ingredients: JSON.stringify([
      "2 cups basmati rice",
      "2 cups mixed vegetables (carrots, peas, beans, cauliflower)",
      "1 large onion, sliced",
      "2 tbsp ghee or vegetable oil",
      "1 tsp cumin seeds",
      "2 bay leaves",
      "4 cloves",
      "2 cinnamon sticks",
      "1 tsp turmeric",
      "1 tsp garam masala",
      "1/2 cup yogurt",
      "2 cups water",
      "Salt to taste",
      "Fresh mint and cilantro for garnish",
    ]),
    instructions: JSON.stringify([
      "Soak rice for 30 minutes, then drain",
      "Heat ghee in a large pot and add whole spices",
      "Add onions and cook until golden",
      "Add vegetables and cook for 5 minutes",
      "Add rice, yogurt, and water",
      "Cover and cook on low heat for 20 minutes",
      "Let rest for 10 minutes before serving",
      "Garnish with fresh herbs",
    ]),
    rating: 4.6,
    isFavorite: false,
    origin: "Indian",
    servings: 6,
  },
  {
    title: "Palak Paneer",
    description: "A creamy spinach curry with Indian cottage cheese.",
    imageUrl:
      "https://www.thespruceeats.com/thmb/3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q3Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/palak-paneer-1955604-hero-01-5b6d0c0b46e0fb0050b3c2d4.jpg",
    ingredients: JSON.stringify([
      "2 bunches fresh spinach",
      "200g paneer, cubed",
      "2 tbsp ghee",
      "1 onion, chopped",
      "2 tomatoes, pureed",
      "2 green chilies",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp turmeric",
      "1 tsp garam masala",
      "1/2 cup heavy cream",
      "Salt to taste",
    ]),
    instructions: JSON.stringify([
      "Blanch spinach and blend into a puree",
      "Heat ghee and fry paneer until golden, set aside",
      "Add cumin seeds, onions, and cook until soft",
      "Add ginger-garlic paste and cook for 1 minute",
      "Add tomato puree and cook until oil separates",
      "Add spinach puree and cook for 5 minutes",
      "Add paneer, cream, and simmer for 5 minutes",
      "Garnish with cream and serve hot",
    ]),
    rating: 4.7,
    isFavorite: false,
    origin: "Indian",
    servings: 4,
  },
];

async function main() {
  try {
    for (const recipe of indianRecipes) {
      await prisma.recipe.create({
        data: recipe,
      });
    }
    console.log("Successfully added Indian recipes to the database");
  } catch (error) {
    console.error("Error adding recipes:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

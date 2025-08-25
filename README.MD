Recipehub

A modern web application for discovering, adding, and managing recipes.
Built with Next.js & TypeScript, Recipehub provides a clean dashboard, admin panel, and RESTful APIs for recipe management.






🚀 Features

✅ Browse Recipes – Explore all recipes on the homepage
✅ Add Recipes – Quickly add new recipes from the dashboard
✅ Edit / Delete Recipes – Update or remove recipes using API endpoints
✅ Admin Panel – Manage admin-only features securely
✅ Responsive UI – Global CSS with a modern look and feel

🗂 Project Structure
app/
├── globals.css                # Global styles
├── layout.tsx                 # Root layout component
├── page.tsx                   # Home page (recipe list)
├── api/
│   └── recipes/
│       ├── route.js           # API route for recipe collection
│       └── [id]/
│           └── route.js       # API route for single recipe
├── dashboard/
│   ├── metadata.ts            # Dashboard metadata
│   ├── page.tsx               # Dashboard main page
│   ├── add/
│   │   └── page.tsx           # Add recipe page
│   └── admin/
│       └── page.tsx           # Admin panel

⚙️ Getting Started
Prerequisites

Node.js
 (16+)

npm
 or yarn

Installation
# Clone the repository
git clone https://github.com/yourusername/recipehub.git
cd recipehub

# Install dependencies
npm install   # or yarn install

# Start development server
npm run dev   # or yarn dev


Now open 👉 http://localhost:3000

📡 API Endpoints
Method	Endpoint	Description
GET	/api/recipes	Fetch all recipes
POST	/api/recipes	Add a new recipe
GET	/api/recipes/[id]	Fetch recipe by ID
PUT	/api/recipes/[id]	Update recipe by ID
DELETE	/api/recipes/[id]	Delete recipe by ID
🛠 Tech Stack

Frontend: Next.js, TypeScript, React

Styling: Global CSS

Backend: RESTful API (Next.js API Routes)

📸 Screenshots

(Add screenshots/gifs of your app here to make the repo more attractive!)

🧭 Roadmap

 Add authentication & user accounts

 Support image uploads for recipes

 Add categories & tags

 Implement search & filtering

 Dark mode

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or create an issue.

📄 License

This project is licensed under the MIT License.
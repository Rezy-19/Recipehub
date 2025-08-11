# Recipehub

Recipehub is a web application for discovering, adding, and managing recipes. Built with Next.js and TypeScript, it features a dashboard, admin panel, and RESTful API endpoints for recipe management.

## Features

- **Browse Recipes:** View a list of recipes on the main page.
- **Add Recipes:** Use the dashboard to add new recipes.
- **Edit/Delete Recipes:** API endpoints support updating and deleting recipes by ID.
- **Admin Panel:** Access admin-specific features from the dashboard.
- **Modern UI:** Styled with global CSS for a clean, responsive experience.

## Project Structure

```
app/
├── globals.css                # Global styles
├── layout.tsx                 # Root layout component
├── page.tsx                   # Home page (recipe list)
├── api/
│   └── recipes/
│       ├── route.js           # API route for recipe collection
│       └── [id]/
│           └── route.js       # API route for individual recipe by ID
├── dashboard/
│   ├── metadata.ts            # Dashboard metadata
│   ├── page.tsx               # Dashboard main page
│   ├── add/
│   │   └── page.tsx           # Add recipe page
│   └── admin/
│       └── page.tsx           # Admin panel page
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/recipehub.git
   cd recipehub
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/recipes` — List all recipes
- `POST /api/recipes` — Add a new recipe
- `GET /api/recipes/[id]` — Get a recipe by ID
- `PUT /api/recipes/[id]` — Update a recipe by ID
- `DELETE /api/recipes/[id]` — Delete a recipe by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
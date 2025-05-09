import Link from "next/link";
import { ChefHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6" />
            <span className="font-bold">RecipeHub</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="#about">About</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="#features">Features</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="#auth">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section
          className="w-full py-12 md:py-24 lg:py-32"
          style={{
            backgroundImage: "url('/images/login-image.png')", // Replace with the correct path to your image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Your Personal Recipe Collection
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover, save, and organize your favorite recipes in one
                  place. Cook with confidence and explore new culinary
                  adventures.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <a href="#auth">Get Started</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="auth"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          style={{
            backgroundImage: "url('/images/front-page_x16.png')", // Replace with the correct path to your image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Join RecipeHub
                </h2>
                <p className="text-muted-foreground">
                  Sign in to your account or create a new one to get started.
                </p>
              </div>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Card className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/10">
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
                      <CardDescription>
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LoginForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="register">
                  <Card className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/10">
                    <CardHeader>
                      <CardTitle>Register</CardTitle>
                      <CardDescription>
                        Create a new account to get started
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RegisterForm />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <p className="text-sm text-muted-foreground">
                        By registering, you agree to our Terms of Service and
                        Privacy Policy.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32"
          style={{
            backgroundImage: "url('/images/front-page_x16.png')", // Replace with the correct path to your image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter">
                  About RecipeHub
                </h2>
                <p className="text-muted-foreground">
                  Your personal recipe management system designed for food
                  lovers and home chefs.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  RecipeHub is a comprehensive recipe management system that
                  allows you to store, organize, and discover recipes from
                  around the world. Whether you're a professional chef or a home
                  cooking enthusiast, RecipeHub provides the tools you need to
                  manage your culinary collection.
                </p>
                <p>
                  Our platform was built with a passion for food and a desire to
                  make cooking more accessible and enjoyable for everyone. We
                  believe that good food brings people together, and we're
                  committed to helping you find and prepare delicious meals for
                  yourself, your family, and your friends.
                </p>
                <p>
                  With RecipeHub, you can rate recipes, save your favorites,
                  adjust serving sizes, and explore new culinary traditions. Our
                  user-friendly interface makes it easy to find exactly what
                  you're looking for, whether it's a quick weeknight dinner or
                  an elaborate feast for a special occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Features
                </h2>
                <p className="text-muted-foreground">
                  Discover what makes RecipeHub the perfect tool for managing
                  your recipes.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Recipe Collection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Store and organize all your favorite recipes in one place
                      with easy access.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Step-by-step cooking instructions with ingredient lists
                      and measurements.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Serving Adjustment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Dynamically adjust recipe servings to match your needs
                      with automatic calculation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Rating System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Rate recipes and see community ratings to find the best
                      dishes.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Favorites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Save your favorite recipes for quick access and future
                      reference.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recipe Origin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Learn about the cultural origins and history behind each
                      recipe.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 RecipeHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="#terms">Terms</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="#privacy">Privacy</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

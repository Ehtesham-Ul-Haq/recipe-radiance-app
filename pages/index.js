import Image from "next/image";
import localFont from "next/font/local";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import SliderRecipes from "@/components/SliderRecipes";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function getServerSideProps({ req }) {
  let recipes = [];
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Detect if it's HTTP or HTTPS
  const host = req.headers.host; // Get the host (e.g., localhost:3000 or your domain)
  const baseUrl = `${protocol}://${host}`; // Construct the full URL

  try {
    const res = await axios.get(`${baseUrl}/api/recipes?limit=8`); // Use the absolute URL
    recipes = res.data.data;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
  }

  return {
    props: {
      recipes,
    },
  };
}

export default function Home({ recipes }) {
  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Recipe Radiance" />
      
      {/* Open Graph Meta Tags for social sharing */}
      <meta property="og:title" content="Recipe Radiance - Share Delicious Recipes" />
      <meta
        property="og:description"
        content="Explore share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://reciperadiance.vercel.app" />
      <meta property="og:image" content="https://reciperadiance.vercel.app/img/logo-img-1.png" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Recipe Radiance - Discover Delicious Recipes" />
      <meta
        name="twitter:description"
        content="Explore a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      <meta name="twitter:image" content="https://reciperadiance.vercel.app/twitter-image.jpg" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="robots" content="index, follow" />


      <meta name="google-site-verification" content="IyD2TfD0g0PP5B-dWgM5z-T2Yh5nG91tLwc8QqNDMj8" />
    </Head>

    <div className="max-w-6xl mx-auto my-1 p-4 shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-3xl text-center font-bold mb-2">
        Welcome to Recipe Radiance!
      </h1>
      <div className="bg-transparent mb-16">
        <SliderRecipes recipes={recipes} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <div className="nextpagelink">
              <Link href={'/allrecipes'}>
                <button className="cssbuttons_io_button">Next Page
                  <div className="icon">
                    <BiArrowBack />    
                  </div>
                </button>
              </Link>
            </div>
    </div>
    </>
  );
}

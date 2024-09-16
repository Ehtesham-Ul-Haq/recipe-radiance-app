import Image from "next/image";
import localFont from "next/font/local";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import SliderRecipes from "@/components/SliderRecipes";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

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
  );
}

/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const [topFiveRecipes, setTopFiveRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data using useEffect
  useEffect(() => {
    const fetchTopFiveRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes?sortBy=reviews");
        const recipes = res.data.data;

        // Sort recipes by the number of reviews
        const topFive = recipes
          .sort((a, b) => b.reviews.length - a.reviews.length)
          .slice(0, 5);

        setTopFiveRecipes(topFive); // Set the sorted recipes
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/recipes"); // Adjust API route as needed
        const data = await res.json();

        const allCategories = data.data.map((recipe) => recipe.category);
        const uniqueCategories = [...new Set(allCategories)]; // Set removes duplicates
        setCategories(uniqueCategories.slice(0, 5));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchTopFiveRecipes();
    fetchCategories();
  }, []); // Empty dependency array to fetch on mount

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/subscribe", { email });
      if (res.status === 200) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear email input
      }
    } catch (error) {
      setMessage("Error subscribing. Please try again.");
      console.error("Error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container flex flex-col items-center justify-between px-4 py-6 mx-auto md:flex-row">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/img/logo-img-nav-1.png"
              alt="Logo"
              className="w-12 h-12 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Recipe Radiance
              </h1>
              <p className="text-sm text-gray-600">Discover, Cook, Share</p>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Subscribe to our newsletter
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              Stay updated with the latest recipes and news!
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 transition duration-300 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className={`bg-purple-950 text-white px-4 py-2 rounded-r-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          </div>
        </div>
      </header>

      <main className="container flex-grow px-4 py-8 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Welcome to Recipe Radiance
        </h2>
        <p className="text-lg text-gray-600">
          Explore our collection of delicious recipes shared by food lovers
          around the world!
        </p>
      </main>

      <footer className="text-white bg-gray-800">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Top Recipes</h3>
              <ul className="space-y-2">
                {topFiveRecipes.map((recipe) => (
                  <li key={recipe._id}>
                    <Link
                      href={`/recipe/${recipe._id}`}
                      className="capitalize transition duration-300 hover:text-purple-400"
                    >
                      {recipe.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Top Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/categories/${category}`}
                      className="capitalize transition duration-300 hover:text-purple-400"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={"/support/faq"}
                    className="transition duration-300 hover:text-purple-400"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/contact"}
                    className="transition duration-300 hover:text-purple-400"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/privacy"}
                    className="transition duration-300 hover:text-purple-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/tos"}
                    className="transition duration-300 hover:text-purple-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Donate</h3>
              <p className="mb-4">
                Support our mission to share culinary delights worldwide!
              </p>
              <button className="px-4 py-2 text-white transition duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600">
                Donate Now
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-700 md:flex-row">
            <p className="mb-4 text-sm text-gray-400 md:mb-0">
              &copy; 2024 Recipe Radiance. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/www.facebook.com"}
                className="text-gray-400 transition duration-300 hover:text-white"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 transition duration-300 hover:text-white"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 transition duration-300 hover:text-white"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 transition duration-300 hover:text-white"
              >
                <FaPinterest size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 transition duration-300 hover:text-white"
              >
                <FaWhatsapp size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

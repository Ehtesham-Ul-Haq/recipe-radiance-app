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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/img/logo-img-nav-1.png"
              alt="Logo"
              className="h-12 w-12 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Recipe Radiance
              </h1>
              <p className="text-sm text-gray-600">Discover, Cook, Share</p>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Stay updated with the latest recipes and news!
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              />
              <button
                type="submit"
                className="bg-purple-950 text-white px-4 py-2 rounded-r-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Main content goes here */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Recipe Radiance
        </h2>
        <p className="text-lg text-gray-600">
          Explore our collection of delicious recipes shared by food lovers
          around the world!
        </p>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Recipes</h3>
              <ul className="space-y-2">
                {topFiveRecipes.map((recipe) => (
                  <li key={recipe._id}>
                    <Link
                      href={`/recipe/${recipe._id}`}
                      className="hover:text-purple-400 transition duration-300 capitalize"
                    >
                      {recipe.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/categories/${category}`}
                      className="hover:text-purple-400 transition duration-300 capitalize"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={"/support/faq"}
                    className="hover:text-purple-400 transition duration-300"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/contact"}
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/privacy"}
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/support/tos"}
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Donate</h3>
              <p className="mb-4">
                Support our mission to share culinary delights worldwide!
              </p>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                Donate Now
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Recipe Radiance. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaPinterest size={24} />
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition duration-300"
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

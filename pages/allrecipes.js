/* eslint-disable @next/next/no-img-element */
// pages/allrecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '@/components/RecipeCard';
import Loader from '@/components/Loader';
import Head from 'next/head';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const RECIPES_PER_PAGE = 16; // Number of recipes per page

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/recipes?limit=${RECIPES_PER_PAGE}&page=${currentPage}`);
        setRecipes(res.data.data);
        setTotalRecipes(res.data.totalCount); // Assuming the API returns the total number of recipes
      } catch (error) {
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>All Recipes - Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Delicious Recipes
      </h1>

      {loading && (
        <Loader />
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
    </>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex list-none space-x-2">
      {currentPage > 1 && (
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 bg-secondary text-white rounded-full shadow-md hover:bg-primary transition ease-in-out duration-300"
          >
            Previous
          </button>
        </li>
      )}
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out ${
              number === currentPage
                ? 'bg-purple-950 text-white scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {number}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 bg-secondary text-white rounded-full shadow-md hover:bg-primary transition ease-in-out duration-300"
          >
            Next
          </button>
        </li>
      )}
    </ul>
  );
};

export default AllRecipes;

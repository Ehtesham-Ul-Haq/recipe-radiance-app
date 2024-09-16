import React, { useEffect, useState } from 'react';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';


const generateCategoryImage = async (category) => {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GPT_APIKEY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: `Generate an image for the indian recipe category: ${category}`}),
    });

   
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

   // Convert the response to a Blob
   const blob = await response.blob();
   // Create a URL for the Blob
   const imageUrl = URL.createObjectURL(blob);
   return imageUrl;
 } catch (error) {
   console.error('Error generating image:', error);
   return "/img/logo-img-2.png"; // Fallback image URL
 }
};





const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState({});


  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/recipes'); // Adjust API route as needed
        const data = await res.json();
        console.log('data:', data);

        const allCategories = data.data.map(recipe => recipe.category);
        const uniqueCategories = [...new Set(allCategories)]; // Set removes duplicates
        setCategories(uniqueCategories);

        const fetchImages = async () => {
          const imgs = {};
          for (const category of uniqueCategories) {
            const imageUrl = await generateCategoryImage(category);
            imgs[category] = imageUrl;
          }
          setImages(imgs);
        };

        fetchImages();

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Explore by Category</h1>
      <p className='text-gray-400 mb-8'>
        Exploring recipes by category allows you to easily find dishes based on specific types or themes that match your preferences.
        Each category helps you narrow down your recipe search, making it easier to discover meals that fit your taste, dietary needs, or occasion!
        Categories can include:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link key={index} href={`categories/${category}`}>
          <CategoryCard
            key={index}
            title={category}
            imageUrl={images[category] || "/img/logo-img-1.png"} // Adjust based on your images
          />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

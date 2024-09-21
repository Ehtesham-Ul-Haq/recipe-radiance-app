/* eslint-disable react-hooks/rules-of-hooks */
import RecipeForm from '@/components/RecipeForm';
import Head from 'next/head';
import React from 'react';
const AddRecipe = () => {


  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Add Recipe to Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div>
      <RecipeForm />
    </div>
    </>
  );
}

export default AddRecipe;

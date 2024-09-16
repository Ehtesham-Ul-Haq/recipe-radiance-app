/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiStar } from 'react-icons/hi';
import { IoIosRestaurant } from 'react-icons/io';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';


// SliderRecipes component
const SliderRecipes = ({ recipes = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,            // Enable autoplay
    autoplaySpeed: 3000,       // Set autoplay speed (in milliseconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Ensure recipes is an array
  const recipeList = Array.isArray(recipes) ? recipes.slice(0, 10) : [];

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {recipeList.map((recipe) => (
          <div unique="true" key={recipe._id} className="p-4">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className='flex items-center absolute top-2 right-2 bg-purple-950 rounded-full text-white p-2 text-xs'>
                <HiStar className="mr-1" /> {recipe.reviews?.length}
              </span>
              <span className='flex items-center absolute top-2 left-2 bg-purple-950 rounded-full text-white p-2 text-xs capitalize'>
                <BiUser className="mr-1" /> {recipe.user.name}
              </span>
              <div className='flex items-center justify-between'>
              <div className="p-4 w-2/3">
                <h3 className="text-lg font-semibold mb-2 capitalize">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.description}</p>
              </div>
              <div className='mx-auto'>
                <Link href={`/recipe/${recipe._id}`}><button className='p-4 rounded-tl-3xl rounded-br-3xl bg-primary text-white hover:bg-secondary transition duration-300 flex items-center justify-center'><IoIosRestaurant />View Recipe</button></Link>
              </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderRecipes;

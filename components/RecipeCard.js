/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { IoIosRestaurant } from "react-icons/io";
import { HiStar } from 'react-icons/hi2';
import { BiUser } from 'react-icons/bi';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-transparent rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl p-4 relative">
      <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-fill rounded-t-md" />
      <h2 className="text-xl text-center font-bold capitalize">{recipe.name}</h2>
      <p className='text-sm text-gray-600'>{recipe.description.substring(0, 100)}...</p>
      <Link href={`/recipe/${recipe._id}`}>
      <button  className="w-full p-1 rounded-tl-3xl rounded-br-3xl bg-secondary text-white hover:bg-primary transition duration-300 flex items-center justify-center">
        <IoIosRestaurant />View Recipe
      </button>
      </Link>
      <span className='flex items-center absolute top-3 left-3 bg-purple-950 rounded-full text-white p-1 text-xs capitalize'><BiUser className='mr-1' />{recipe.user.name}</span>
      <span className='flex items-center space-x-2 absolute top-3 right-3 bg-purple-950 rounded-full text-white p-1 text-xs capitalize'><HiStar className='mr-1' />{recipe.reviews?.length}</span>
    </div>
  );
};

export default RecipeCard;

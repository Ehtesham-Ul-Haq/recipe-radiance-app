/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaPinterest, FaStar, FaWhatsapp, FaInstagramSquare } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import Link from 'next/link';
import Loader from '@/components/Loader';

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchRecipe = async () => {
        try {
          const res = await axios.get(`/api/recipes/${id}`);
          setRecipe(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchRecipe();
      setLoading(false);
    }
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Submitting review:', { rating, comment });
    setRating(0);
    setComment('');
  };


  const handleShareClick = (platform) => {
    let shareUrl = '';
    const pageUrl = `https://reciperadiance.vercel.app/recipe/${id}`; // Dynamically construct the URL
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't allow direct web sharing, but this link can open Instagram.
        shareUrl = 'https://www.instagram.com/';
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=Check%20out%20this%20page:%20${encodeURIComponent(pageUrl)}`;
        break;
      default:
        break;
    }

    // Open the share URL in a new tab
    window.open(shareUrl, '_blank');
  };

  if (!recipe) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        {loading && (
        <Loader />
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
    <div className="mb-8">
      <img src={recipe.image} alt={recipe.name} className="w-full h-96 object-cover rounded-lg mb-4" />
      <h1 className="text-4xl font-bold mb-2 capitalize">{recipe.name}</h1>
      <p className="text-gray-600 mb-4 capitalize">{recipe.description}</p>
      <p className="text-gray-600 mb-4 capitalize flex items-center gap-4 font-semibold">Category <BiCategory size={24} /> <Link href={`/category/${recipe.category}`} className='hover:text-purple-700 hover:underline transition-colors duration-200'>{recipe.category}</Link></p>
      <div className="flex space-x-4 mb-4">
      <button
        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        onClick={() => handleShareClick('facebook')}
      >
        <FaFacebook size={24} />
      </button>
      <button
        className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
        onClick={() => handleShareClick('twitter')}
      >
        <FaTwitter size={24} />
      </button>
      <button
        className="text-red-600 hover:text-red-800 transition-colors duration-200"
        onClick={() => handleShareClick('pinterest')}
      >
        <FaPinterest size={24} />
      </button>
      <button
        className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
        onClick={() => handleShareClick('instagram')}
      >
        <FaInstagramSquare size={24} />
      </button>
      <button
        className="text-green-600 hover:text-green-800 transition-colors duration-200"
        onClick={() => handleShareClick('whatsapp')}
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-2">{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="mb-2">{instruction}</li>
          ))}
        </ol>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {recipe.reviews.map((review, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold mr-2 capitalize">{review.userId?.name || 'Anonymous'}</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < review.rating ? 'text-purple-700' : 'text-gray-300'} />
              ))}
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>

    <div>
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmitReview} className="space-y-4">
        <div>
          <label className="block mb-2">Rating:</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${star <= rating ? 'text-purple-700' : 'text-gray-300'}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-lg"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
          Submit Review
        </button>
      </form>
    </div>
    </>
      )}
  </div>
  );
};

export default RecipePage;
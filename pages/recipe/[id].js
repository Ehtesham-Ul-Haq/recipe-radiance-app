/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaStar,
  FaWhatsapp,
  FaInstagramSquare,
  FaHeart,
  FaPencilAlt,
} from "react-icons/fa";
import { BiCategory, BiTrash, BiUser } from "react-icons/bi";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import Head from "next/head";

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isFavorited, setIsFavorited] = useState(false); // To track if the recipe is favorited
  const [favoriteError, setFavoriteError] = useState(null); // To display errors related to favorite actions
  const [hasAccess, setHasAccess] = useState(true); // State to manage access

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchRecipe = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from localStorage
          const userdata = JSON.parse(localStorage.getItem('user'));

          const res = await axios.get(`/api/recipes/${id}`);
          setRecipe(res.data.data);
          // make sure to restrict unauthorized access to private features of users
          if (userdata && res) {
            if (userdata._id !== res.data.data.user._id) {
              setHasAccess(false);
            }
          }

          // Fetch user's favorite recipes and check if the current recipe is favorited
          const userFavoritesRes = await axios.get(`/api/users/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token to get user's favorites
            },
          });
          const favoriteRecipes = userFavoritesRes.data.favoritesRecipes;
          // Check if the current recipe is in the user's favorite list
          setIsFavorited(favoriteRecipes.some((fav) => fav._id === id));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You need to be logged in to submit a review.");
        return;
      }

      // Make the POST request to the API
      const response = await fetch(`/api/reviews/add?recipeId=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      // Parse the response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong while submitting the review."
        );
      }

      // Handle successful response
      toast.success("Review added successfully!");
    } catch (error) {
      // Handle errors
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleShareClick = (platform) => {
    let shareUrl = "";
    const pageUrl = `https://reciperadiance.vercel.app/recipe/${id}`; // Dynamically construct the URL

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}`;
        break;
      case "instagram":
        // Instagram doesn't allow direct web sharing, but this link can open Instagram.
        shareUrl = "https://www.instagram.com/";
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=Check%20out%20this%20page:%20${encodeURIComponent(
          pageUrl
        )}`;
        break;
      default:
        break;
    }

    // Open the share URL in a new tab
    window.open(shareUrl, "_blank");
  };

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("token"); // or wherever you store the token
    if (!token) {
      if (!toast.isActive("favorite-toast")) {
        // Use a unique toast ID
        toast.info("Login to Save Recipe as Favorite!", {
          toastId: "favorite-toast", // Set a unique toastId
        });
      }
    }
    try {
      const response = await axios.post(
        `/api/users/favorites?recipeId=${id}`, // Send recipeId in the query
        {}, // No need for a request body, since recipeId is in query
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );

      if (response.status === 200) {
        setIsFavorited(true); // Update state to show recipe is favorited
        if (!toast.isActive("favoritesaved-toast")) {
          // Use a unique toast ID
          toast.success("Saved to Your Favorite Recipes Successfully!", {
            toastId: "favoritesaved-toast", // Set a unique toastId
          });
        }
      }
    } catch (error) {
      setFavoriteError("Failed to add to favorites");
      console.error(error);
    }
  };

  if (!recipe) return <Loader />;

  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>{recipe.name.replace(/\b\w/g, char => char.toUpperCase())} by {recipe.user.name.replace(/\b\w/g, char => char.toUpperCase())} - Recipe Radiance</title>
      <meta
        name="description"
        content={recipe.description}
      />
      </Head>

    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {loading && <Loader />}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-8">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl md:text-4xl font-bold mb-2 capitalize">
              {recipe.name}
            </h1>
            <div className="md:flex items-center justify-between my-2 w-1/2 md:w-full mx-auto">
              {/* update recipe */}
              {hasAccess && <div className="flex items-center gap-4 my-2 md:my-0">
                <Link
                  href={`/recipe/update/${id}`}
                  className="text-base bg-secondary border rounded-xl border-secondary px-4 py-1 text-white hover:bg-white hover:text-secondary transition-colors duration-200 flex items-center"
                  title="Update Recipe"
                >
                  <FaPencilAlt size={20} className="mr-2" />
                  Update Recipe
                </Link>
              </div>}
              {/* delete recipe */}
              {hasAccess && <div className="flex items-center gap-4 my-2 md:my-0">
                <Link
                  href={`/recipe/delete/${id}`}
                  className="text-base bg-orange-700 border rounded-xl border-orange-700 px-4 py-1 text-white hover:bg-white hover:text-orange-700 transition-colors duration-200 flex items-center"
                  title="Delete Recipe"
                >
                  <BiTrash size={20} className="mr-2" />
                  Delete Recipe
                </Link>
              </div>}

              {/* Save to Favorites */}
              <div className="flex items-center gap-4 my-2 md:my-0">
                <button
                  onClick={handleFavoriteClick}
                  className={`text-base ${
                    isFavorited
                      ? "text-red-600 border-red-600"
                      : "text-gray-400 border-gray-400"
                  } hover:text-red-600 px-4 py-1 transition-colors duration-200 border rounded-xl flex items-center`}
                  title="Save to Favorites"
                >
                  <FaHeart size={20} className="mr-2" />
                  {isFavorited ? (
                    <span>Favorited</span>
                  ) : (
                    <span>Set to Favorite</span>
                  )}
                </button>
                {favoriteError && (
                  <p className="text-red-600">{favoriteError}</p>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-4 capitalize">
              {recipe.description}
            </p>
            <p className="text-gray-600 mb-4 capitalize flex items-center gap-4 font-semibold">
              Category <BiCategory size={24} />{" "}
              <Link
                href={`/categories/${recipe.category}`}
                className="hover:text-purple-700 hover:underline transition-colors duration-200"
              >
                {recipe.category}
              </Link>
            </p>
            <p className="text-gray-600 mb-4 capitalize flex items-center gap-4 font-semibold">
              Author <BiUser size={24} />{" "}
              <Link
                href={`/user/${recipe.user._id}`}
                className="hover:text-purple-700 hover:underline transition-colors duration-200"
              >
                {recipe.user.name}
              </Link>
            </p>

            <div className="flex space-x-4 mb-4">
              <button
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                onClick={() => handleShareClick("facebook")}
              >
                <FaFacebook size={24} />
              </button>
              <button
                className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                onClick={() => handleShareClick("twitter")}
              >
                <FaTwitter size={24} />
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                onClick={() => handleShareClick("pinterest")}
              >
                <FaPinterest size={24} />
              </button>
              <button
                className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
                onClick={() => handleShareClick("instagram")}
              >
                <FaInstagramSquare size={24} />
              </button>
              <button
                className="text-green-600 hover:text-green-800 transition-colors duration-200"
                onClick={() => handleShareClick("whatsapp")}
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
                  <li key={index} className="mb-2">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="mb-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {recipe.reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold mr-2 capitalize">
                    {review.userId?.name || "Anonymous"}
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-purple-700"
                            : "text-gray-300"
                        }
                      />
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
                      className={`text-2xl ${
                        star <= rating ? "text-purple-700" : "text-gray-300"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2">
                  Comment:
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
              >
                Submit Review
              </button>
            </form>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default RecipePage;

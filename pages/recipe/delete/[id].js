/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '@/components/Loader'; // Assuming you have a Loader component
import { toast } from 'react-toastify';

const DeleteRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the recipe details to display before deleting
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming user authentication
    if (!token) {
        router.push('/login');
        toast.error('Login to get Authenticated!');
    }
    if (token) {
        // Fetch the recipe details to display before deleting

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to load recipe details');
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
}
    
  }, [id, router]);

    // Handle delete action

    const handleDelete = async () => {
        const token = localStorage.getItem('token'); // Assuming user authentication
        setLoading(true);
    
        try {
          await axios.delete(`/api/recipes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success('Recipe deleted successfully!');
          router.push('/allrecipes'); // Redirect to home page after deletion
        } catch (error) {
          console.error('Error deleting recipe:', error);
          toast.error('Failed to delete the Recipe');
          setError('Failed to delete recipe');
        } finally {
          setLoading(false);
        }
      };


  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-purple-950">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {recipe ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Delete Recipe</h1>
            <p className="text-gray-700 mb-6">Are you sure you want to delete the following recipe?</p>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <img 
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">Name:<span className='ml-2'>{recipe.name}</span></h2>
              <p className="text-sm font-semibold text-gray-800">Category:<span className='ml-2'>{recipe.category}</span></p>
              <p className="text-xs font-semibold text-gray-800">Total Reviews:<span className='ml-2'>{recipe.reviews.length}</span></p>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                onClick={() => router.push(`/recipe/${id}`)} // Redirect back to recipe details
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">No recipe found with the provided ID.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteRecipe;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfile from '@/components/UserProfile';
import Loader from '@/components/Loader';
import RecipeCard from '@/components/RecipeCard';
import Head from 'next/head';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/api/users/${id}`);
          setUser(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      // Fetch recipes by user
      const fetchUserRecipes = async () => {
        try {
          const response = await axios.get(`/api/recipes?userId=${id}`);
          setRecipes(response.data.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch user recipes', error);
          console.error(error);
          setLoading(false);
        }
      };

      fetchUserRecipes();
    }
  }, [id]);

  if (!user) return <Loader />;
  if (loading) {
    return <Loader />
  }

  return <>
    {/* Meta tags and page title */}
    <Head>
    <title>{user.name.replace(/\b\w/g, char => char.toUpperCase())} - Recipe Radiance Profile</title>
    <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

  <UserProfile user={user} />;
  <div className="max-w-4xl mx-auto px-2 py-4 md:p-4 shadow-inner border rounded-lg">
      <h1 className="text-base md:text-3xl font-semibold mb-6 capitalize italic text-center"><span className='uppercase bg-purple-950 py-1 px-4 text-white rounded-2xl'>Recipes</span> <span className='uppercase bg-purple-950 py-1 px-4 text-white rounded-2xl'>by</span> <span className='uppercase bg-purple-950 py-1 px-4 text-white rounded-2xl'>{user.name}</span></h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes found for this user.</p>
      )}
    </div>
  </>
};

export default UserPage;

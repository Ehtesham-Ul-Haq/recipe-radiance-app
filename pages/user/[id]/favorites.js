/* eslint-disable react/no-unescaped-entities */
import Loader from '@/components/Loader';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const UserFavorites = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true); // Set loading to true when starting fetch
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/api/users/${id}`);
          setUser(res.data.data); // Assuming res.data.data contains the user data
          console.log('ued', res.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Set loading to false once data fetching is complete
        }
      };
      fetchUser();
    }
  }, [id]);
  

  if (loading) return <Loader />;

  return (
    <div className='max-w-6xl mx-auto my-1 p-4 shadow-lg rounded-lg overflow-hidden'>
      <h1 className='capitalize text-center text-xl font-semibold'>{user.name ? `${user.name}'s Favorite Recipes` : 'Loading...'}</h1>
      {loading ? (
        <Loader />
      ) : (
        <ul className="list-disc pl-5 space-y-3">
          {user.favoritesRecipes && user.favoritesRecipes.length > 0 ? (
            user.favoritesRecipes.map((recipe) => (
              <li key={recipe._id} className="text-green-600 hover:text-green-800 transition-colors duration-300">
                <Link href={`/recipe/${recipe._id}`}>
                  <span className="hover:underline">{recipe.name}</span>
                </Link>
              </li>
            ))
          ) : (
            <p>No favorite recipes found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserFavorites;


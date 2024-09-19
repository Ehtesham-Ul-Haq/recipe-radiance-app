/* eslint-disable react/no-unescaped-entities */
import Loader from '@/components/Loader';
import RecipeForm from '@/components/RecipeForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateRecipe = () => {
    const router = useRouter();
    const { id } = router.query;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasAccess, setHasAccess] = useState(true); // State to manage access


    useEffect(() => {
        if (id) {
          setLoading(true);
          const fetchRecipe = async () => {
            try {
              const token = localStorage.getItem("token"); // Get token from localStorage
              if (!token) {
                router.push('/login');
                toast.info('Login to get Authenticated!')
              }
              const userdata = JSON.parse(localStorage.getItem('user'));
    
              const res = await axios.get(`/api/recipes/${id}`);
              setRecipe(res.data.data);
              // make sure to restrict unauthorized access to private features of users
              if (userdata && res) {
                if (userdata._id !== res.data.data.user._id) {
                  setHasAccess(false);
                }
              }
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          };
          fetchRecipe();
          setLoading(false);
        }
      }, [id, router]);

      if (loading) {
        <Loader />
      }

      else if (!recipe) return <Loader />;


  return (
    <div className='max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg'>
      {!loading && (
        hasAccess ? (<div>
            <RecipeForm initialRecipe={recipe} />
        </div>) : <div className="max-w-lg mx-auto mt-4 p-6 bg-red-100 rounded-lg text-red-800 shadow-lg border border-red-200">
        <h1 className="text-2xl font-semibold text-center">Access Denied</h1>
        <p className="text-red-500 text-center">You don't have access to update this user's password.</p>;
      </div>)}
    </div>
  );
}

export default UpdateRecipe;

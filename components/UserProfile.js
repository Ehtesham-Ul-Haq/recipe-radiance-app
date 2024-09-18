/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiHeart, BiPencil, BiSolidKey } from 'react-icons/bi';
import { toast } from 'react-toastify';

const UserProfile = ({ user }) => {

  const router = useRouter();
  const { id } = router.query;

  const [hasAccess, setHasAccess] = useState(true); // State to manage access


  useEffect(() => {
    // Check if user is authenticated and has access to update this profile
    const token = localStorage.getItem('token');
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Parse the logged-in user data from localStorage
    
    if (!token) {
      router.push('/login'); // Redirect to login page if no token is found
          if (!toast.isActive('view-toast')) { // Use a unique toast ID
            toast.info('Login to View User Page!', {
              toastId: 'view-toast', // Set a unique toastId
            });
    
      }
    }
     

    // Check if the logged-in user's ID matches the ID in the query
    if (loggedInUser && loggedInUser._id !== id) {
      setHasAccess(false);
    }
  }, [id, router]);

  return (
    <div className='max-w-xl mx-auto p-8'>
    <div className="max-w-md mx-auto bg-purple-50 p-8 rounded-2xl shadow-2xl border border-purple-200">
      <img 
        src={user.image} 
        alt={user.name} 
        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-300 object-cover" 
      />
      <h1 className="text-3xl font-bold text-purple-950 text-center mb-4 capitalize">{user.name}</h1>
      <p className="text-lg text-purple-900 text-center mb-6">Email: <span className="font-semibold">{user.email}</span></p>
      
      {hasAccess && <Link href={`/user/${user._id}/update`} className=" w-40 mx-auto font-semibold text-purple-950 border border-purple-950 hover:bg-purple-950 hover:text-white py-2 px-4 rounded-tl-3xl rounded-br-3xl flex items-center"><BiPencil className='mr-4' />Edit Profile</Link>}
      {hasAccess && <Link href={`/user/${user._id}/changepassword`} className="w-48 mx-auto font-medium text-sm text-purple-950 border border-purple-950 hover:bg-purple-950 hover:text-white py-1 px-2 mt-4 rounded-tl-3xl rounded-br-3xl flex items-center"><BiSolidKey className='mr-4' />Change Password</Link>}
      <Link href={`/user/${user._id}/favorites`} className="w-full md:w-80 mx-auto mt-4 font-semibold text-red-700 border border-red-700 hover:bg-red-700 hover:text-white py-2 px-4 rounded-tl-3xl rounded-br-3xl flex items-center capitalize"><BiHeart className='mr-4' />{user.name}'s Favorite Recipes</Link>
      </div>
    
    </div>
  );
};

export default UserProfile;

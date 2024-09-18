/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasAccess, setHasAccess] = useState(true); // State to manage access

  useEffect(() => {
    // Check if user is authenticated and has access to update this profile
    const token = localStorage.getItem('token');
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Parse the logged-in user data from localStorage
    
    if (!token) {
      router.push('/login'); // Redirect to login page if no token is found
      if (!toast.isActive('passwordlogin-toast')) { // Use a unique toast ID
        toast.info('Login to Authenticate!', {
          toastId: 'passwordlogin-toast', // Set a unique toastId
        });
      }
    }

    // Check if the logged-in user's ID matches the ID in the query
    if (loggedInUser && loggedInUser._id !== id) {
      setHasAccess(false);
    }
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      if (!toast.isActive('passwordmiss-toast')) { // Use a unique toast ID
        toast.error('Login to Authenticate!', {
          toastId: 'passwordmiss-toast', // Set a unique toastId
        });
      }
      return;
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT', // Assuming your API uses PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword, // Using 'password' as the field name
        }),
      });

      if (response.ok) {
        setSuccess('Password changed successfully!');
        if (!toast.isActive('passwordok-toast')) { // Use a unique toast ID
          toast.success('Your Password is Changed Successfully!', {
            toastId: 'passwordok-toast', // Set a unique toastId
          });
        }
        router.push(`/user/${id}`);
        setError('');
      } else {
        setError('Failed to change password');
        if (!toast.isActive('passwordchangeerror-toast')) { // Use a unique toast ID
          toast.error('Failed to change Password!', {
            toastId: 'passwordchangeerror-toast', // Set a unique toastId
          });
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (!toast.isActive('passwordcatcherror-toast')) { // Use a unique toast ID
        toast.error('Failed to change Password!', {
          toastId: 'passwordcatcherror-toast', // Set a unique toastId
        });
      }
      setError('An error occurred');
    }
  };

  if (!hasAccess) {
    return (
      <div className="max-w-lg mx-auto mt-4 p-6 bg-red-100 rounded-lg text-red-800 shadow-lg border border-red-200">
        <h1 className="text-2xl font-semibold text-center">Access Denied</h1>
        <p className="text-red-500 text-center">You don't have access to update this user's password.</p>;
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-4">
        Change Password <FaKey className='text-purple-800' />
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

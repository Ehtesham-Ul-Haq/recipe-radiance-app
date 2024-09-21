/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaEnvelope, FaEye, FaEyeSlash, FaUnlockAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Head from 'next/head';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [userFound, setUserFound] = useState(null); // Store user if found
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Function to handle finding the account by email
  const handleFindAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/users/getuser', { email });
      if (response.data.data) {
        setUserFound(response.data.data);
        setError('');
      } else {
        setError('No account found with this email.');
      }
    } catch (error) {
      setError('Error finding account');
    } finally {
      setLoading(false);
    }
  };


  // Function to handle resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
        toast.error('Passwords do not match!');
        return;
      }


    setLoading(true);
    setError('');
    setSuccess('');


    try {
        const response = await fetch(`/api/users/${userFound._id}`, {
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
          router.push(`/login`);
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
      setLoading(true);
    };

  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Reset Password - Recipe Radiance</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-purple-950">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Reset Your Password</h1>

        {/* If user is not found yet, show email input */}
        {!userFound && (
          <form onSubmit={handleFindAccount} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg mb-4">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none transition duration-300"
            >
              {loading ? 'Finding account...' : 'Find Account'}
            </button>
          </form>
        )}

        {/* If user is found, show reset password form */}
        {userFound && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-4">
                <span className='text-xl font-semibold text-center bg-gray-200 py-2 px-6 mb-2 rounded-xl'>Account Found</span>
                <img src={userFound.image} alt="user image" className='w-28 h-28 mx-auto rounded-full object-cover mt-2' />
              <h2 className="text-xl font-semibold text-gray-700">
               <span className="text-purple-600 capitalize">{userFound.name}</span>
              </h2>
              <p className="text-base font-semibold text-gray-700 flex items-center justify-center gap-2">
                <FaEnvelope /> <span className="text-purple-600">{userFound.email}</span>
              </p>
              <p className="text-gray-500">Reset your password below:</p>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg mb-4 relative">
              <FaUnlockAlt className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide Password" : "Show Password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center border border-gray-300 p-2 rounded-lg mb-4 relative">
              <FaUnlockAlt className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide Password" : "Show Password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none transition duration-300"
            >
              {loading ? 'Resetting password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default ResetPassword;

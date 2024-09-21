/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Head from 'next/head';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [imageUrl, setImageUrl] = useState('/img/logo-img-2.png'); // Default fallback image
  const router = useRouter();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleRecipeRadianceSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/signup', {
        ...formData,
        type: 'recipeRadiance',
      });
      setMessage('Signup successful!');
      if (!toast.isActive('signupsuccessfully-toast')) { // Use a unique toast ID
        toast.success("Your Signup is Successfull! Now Login to Move Further!", {
          toastId: 'signupsuccessfully-toast', // Set a unique toastId
        });
      }
                    // Optionally redirect the user after login
       router.push('/login'); // Replace with your desired page
    } catch (error) {
      setMessage('Signup failed. Please try again.');
      if (!toast.isActive('signuperrorc-toast')) { // Use a unique toast ID
        toast.error("Your Signup is Failed! Try Again!", {
          toastId: 'signuperrorc-toast', // Set a unique toastId
        });
      }
    }
  };

  useEffect(() => {
    const generateCategoryImage = async () => {
      try {
        const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GPT_APIKEY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: "Generate an image for the indian recipe chicken tikka" }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        // Convert the response to a Blob
        const blob = await response.blob();
        // Create a URL for the Blob
        const generatedImageUrl = URL.createObjectURL(blob);
        setImageUrl(generatedImageUrl);
      } catch (error) {
        console.error('Error generating image:', error);
        // Set fallback image URL on error
        setImageUrl('/img/logo-img-2.png');
      }
    };

    generateCategoryImage();
  }, []);
  

  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Signup - Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl bg-purple-100 shadow-lg rounded-lg overflow-hidden">
        {/* Left Image for Big Screens */}
        <div className="order-1 lg:order-1 w-full lg:w-1/2">
        <img
            src={imageUrl} 
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Signup Form */}
        <div className="order-2 lg:order-2 w-full lg:w-1/2 p-8">
          <h1 className="text-2xl font-semibold text-center text-purple-950 mb-6">Sign Up</h1>

          <form onSubmit={handleRecipeRadianceSignup} className="space-y-4">
            <h2 className="text-xl text-purple-950 text-center mb-2">Signup with Recipe Radiance</h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent"
            />
            <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950 focus:border-transparent"
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
              className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-950 transition"
            >
              Sign Up
            </button>
          </form>
              <p className='text-sm text-slate-600 mt-1'>Already have an Account! <Link href={'/login'} className='hover:text-purple-950'>Login </Link>here</p>
          {message && (
            <p className="text-center text-red-500 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
    </>

  );
}

/* eslint-disable @next/next/no-img-element */
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const UpdateUserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ name: '', email: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    // Check if the logged-in user is allowed to update the profile
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Retrieve logged-in user from localStorage

    if (loggedInUser?._id !== id) {
      // If logged-in user ID does not match the profile ID
      setErrorMessage("You don't have access to update someone else's profile.");
      setLoading(false);
      return;
    }

    if (id) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`/api/users/${id}`);
          const data = await response.json();
          setUser(data.data);
          setImagePreview(data.data.image); // Set initial image preview
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     const fetchUserProfile = async () => {
  //       try {
  //         const response = await fetch(`/api/users/${id}`);
  //         const data = await response.json();
  //         setUser(data.data);
  //         setImagePreview(data.data.image); // Set initial image preview
  //         setLoading(false);
  //       } catch (error) {
  //         console.error('Error fetching user profile:', error);
  //       }
  //     };

  //     fetchUserProfile();
  //   }
  // }, [id]);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setUser({ ...user, image: reader.result }); // Save image as data URL
        };
        reader.readAsDataURL(file); // Read file as Data URL
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        router.push(`/user/${id}`); // Redirect to user profile page
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <Loader />;

  if (errorMessage) {
    return (
      <div className="max-w-lg mx-auto mt-4 p-6 bg-red-100 rounded-lg text-red-800 shadow-lg border border-red-200">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <img
          src={imagePreview || '/path/to/default/image.jpg'}
          alt="Profile Preview"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
        />
        <h1 className="text-3xl font-semibold text-gray-800">Update Profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-900 font-medium mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-900 font-medium mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-900 font-medium mb-1">Profile Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;

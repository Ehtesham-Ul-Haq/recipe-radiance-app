/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaUtensils, FaUsers, FaLightbulb } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-purple-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">About Recipe Radiance</h1>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">At Recipe Radiance, we're on a mission to bring the joy of cooking to everyone. We believe that great food has the power to bring people together, and we're here to make that happen.</p>
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700">We envision a world where anyone can become a kitchen maestro, where recipes are shared freely, and where culinary creativity knows no bounds.</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-purple-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-purple-800 text-center mb-12">What Makes Us Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaUtensils className="text-5xl text-purple-500" />}
              title="User-Friendly Recipe Sharing"
              description="Easily share and discover delicious recipes from around the world."
            />
            <FeatureCard 
              icon={<FaUsers className="text-5xl text-purple-500" />}
              title="Vibrant Community"
              description="Connect with fellow food enthusiasts, share tips, and get inspired."
            />
            <FeatureCard 
              icon={<FaLightbulb className="text-5xl text-purple-500" />}
              title="Culinary Inspiration"
              description="Explore new cuisines, techniques, and flavor combinations."
            />
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-purple-800 text-center mb-8">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">Recipe Radiance was born out of a simple idea: that cooking should be accessible, enjoyable, and social. Our founders, passionate home cooks themselves, realized that there was a need for a platform that not only provided great recipes but also fostered a community of food lovers.</p>
          <p className="text-lg text-gray-700 mb-6">Since our humble beginnings in 2024, we've grown into a thriving community of over 1 million users from all corners of the globe. Every day, thousands of recipes are shared, tried, and loved by our members.</p>
          <p className="text-lg text-gray-700">But we're more than just a recipe-sharing platform. We're a movement that believes in the power of food to bring people together, to inspire creativity, and to make the world a little bit tastier, one dish at a time.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Culinary Community?</h2>
          <p className="text-xl text-purple-100 mb-8">Start sharing your recipes, discover new favorites, and connect with fellow food lovers today!</p>
          <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition duration-300">Join Recipe Radiance</button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
      <div className="mb-4 w-10 mx-auto">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutPage;
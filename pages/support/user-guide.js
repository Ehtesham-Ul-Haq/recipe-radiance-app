// pages/user-guide.js

import Head from 'next/head';
import React from 'react';
import { FaUser, FaTools, FaCode, FaQuestionCircle } from 'react-icons/fa';

const UserGuide = () => {
  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>User Guide - Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">User Guide</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <GuideCard
            icon={<FaUser className="text-4xl text-blue-500" />}
            title="Getting Started"
            description="Learn how to set up your account and get started with our platform."
            content="To get started, you need to create an account by clicking on 'Sign Up' in the top right corner. Follow the on-screen instructions to complete the registration process."
          />
          <GuideCard
            icon={<FaTools className="text-4xl text-green-500" />}
            title="Features Overview"
            description="Explore the key features and tools available on our platform."
            content="Our platform offers a range of features including recipe creation, user profiles, and recipe sharing. You can also customize your profile and manage your recipes from the dashboard."
          />
          <GuideCard
            icon={<FaCode className="text-4xl text-yellow-500" />}
            title="Advanced Tips"
            description="Discover advanced tips and tricks to make the most of your experience."
            content="For advanced users, we offer tips on optimizing your recipe posts, using tags effectively, and integrating with third-party tools to enhance your experience."
          />
          <GuideCard
            icon={<FaQuestionCircle className="text-4xl text-red-500" />}
            title="Troubleshooting"
            description="Find solutions to common issues and problems you might encounter."
            content="If you encounter any issues, please refer to our troubleshooting section. Here, we address common problems and provide step-by-step solutions."
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Need More Help?</h2>
          <p className="text-gray-600 mb-6">If you need further assistance, please reach out to our support team or visit our help center for more information.</p>
          <button className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

const GuideCard = ({ icon, title, description, content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800 ml-4">{title}</h3>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default UserGuide;

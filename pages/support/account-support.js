// pages/account-support.js

import Head from 'next/head';
import React from 'react';
import { FaUserCog, FaLock, FaExclamationCircle, FaEnvelope } from 'react-icons/fa';

const AccountSupport = () => {
  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Account Support - Recipe Radiance</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Account Support</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <SupportCard
            icon={<FaUserCog className="text-4xl text-blue-500" />}
            title="Profile Management"
            description="Update your profile information and preferences."
            content="To update your profile, navigate to your account settings. Here you can change your username, email, and profile picture. Make sure to save your changes."
          />
          <SupportCard
            icon={<FaLock className="text-4xl text-green-500" />}
            title="Password Reset"
            description="Learn how to reset your password if you've forgotten it."
            content="If you've forgotten your password, click on 'Forgot Password' on the login page. Follow the instructions to reset your password using your registered email address."
          />
          <SupportCard
            icon={<FaExclamationCircle className="text-4xl text-yellow-500" />}
            title="Account Issues"
            description="Troubleshoot common account-related issues."
            content="If you are experiencing issues with your account, check our troubleshooting guide for common problems. If the issue persists, contact our support team for assistance."
          />
          <SupportCard
            icon={<FaEnvelope className="text-4xl text-red-500" />}
            title="Contact Support"
            description="Reach out to our support team for further assistance."
            content="For any other account-related issues or if you need personalized help, please contact our support team. You can reach us through the contact form or email us directly."
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Need More Help?</h2>
          <p className="text-gray-600 mb-6">If you need additional assistance with your account, our support team is here to help you.</p>
          <button className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

const SupportCard = ({ icon, title, description, content }) => {
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

export default AccountSupport;

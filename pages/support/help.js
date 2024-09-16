import { useRouter } from 'next/router';
import React from 'react';
import { FaQuestion, FaBook, FaUserCircle, FaEnvelope } from 'react-icons/fa';

const HelpPage = () => {
  const router = useRouter();

  return (
    <div className="bg-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-800 text-center mb-12">Help Center</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <HelpCard
            icon={<FaQuestion className="text-4xl text-purple-500" />}
            title="FAQ"
            description="Find answers to commonly asked questions"
            action={() => router.push('/support/faq')} // Change this to your FAQ page route
          />
          <HelpCard
            icon={<FaBook className="text-4xl text-purple-500" />}
            title="User Guide"
            description="Learn how to use Recipe Radiance effectively"
            action={() => router.push('/support/user-guide')} // Change this to your User Guide page route
          />
          <HelpCard
            icon={<FaUserCircle className="text-4xl text-purple-500" />}
            title="Account Support"
            description="Get help with your account settings"
            action={() => router.push('/support/account-support')} // Change this to your Account Support page route
          />
          <HelpCard
            icon={<FaEnvelope className="text-4xl text-purple-500" />}
            title="Contact Us"
            description="Reach out to our support team"
            action={() => router.push('/support/contact')} // Change this to your Contact Us page route
          />
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Our support team is always ready to assist you.</p>
          <button
            onClick={() => router.push('/support/contact')} // Change this to your Contact Us page route
            className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

const HelpCard = ({ icon, title, description, action }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={action}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-purple-800 ml-4">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HelpPage;

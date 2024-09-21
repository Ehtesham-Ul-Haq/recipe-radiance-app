/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>PrivacyPolicy - Recipe Radiance</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Privacy Policy</h1>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <p className="text-gray-600 mb-6">
            Welcome to Recipe Radiance! Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            When you create an account, post recipes, or interact with our website, we may collect both personal and non-personal information, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Your name, email address, and profile information.</li>
            <li>Recipes you share, including images and descriptions.</li>
            <li>Usage data, including IP addresses, browser types, and interactions with the site.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-6">
            We use your information to enhance your experience on Recipe Radiance, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Personalizing content and recommendations based on your preferences.</li>
            <li>Improving website performance and functionality.</li>
            <li>Communicating with you, including sending updates and notifications.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
          <p className="text-gray-600 mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist in operating our website and conducting business, as long as they agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Security of Your Information</h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate technical and organizational measures to safeguard your information. However, please note that no method of transmission over the internet or electronic storage is completely secure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies</h2>
          <p className="text-gray-600 mb-6">
            Recipe Radiance uses cookies to improve your browsing experience. You can choose to disable cookies through your browser settings, but doing so may limit your ability to use certain features of our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Modified" date. We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions or concerns about our Privacy Policy or the handling of your personal data, feel free to reach out to us at support@reciperadiance.com.
          </p>

          <p className="text-gray-500 text-sm">Last Updated: September 15, 2024</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;

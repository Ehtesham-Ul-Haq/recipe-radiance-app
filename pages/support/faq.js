import Head from 'next/head';
import React from 'react';

const faq = () => {
    const faqData = [
        { question: 'How do I create an account?', answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill in the required information and follow the prompts to complete your registration.' },
        { question: 'How can I share my recipe?', answer: 'After logging in, navigate to your profile and click on "Add New Recipe". Fill in the recipe details, ingredients, and steps. Don\'t forget to add a mouth-watering photo before submitting!' },
        { question: 'Can I edit my recipes after posting?', answer: 'Yes! You can edit your recipes at any time. Go to your profile, find the recipe you want to edit, and click on the "Edit" button.' },
        { question: 'How do I save recipes from other users?', answer: 'When you find a recipe you like, click on the "Save to Favorite" button below the recipe. You can access all your saved recipes from your profile.' },
      ];
    
  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Frequently asked questions - Recipe Radiance</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="bg-gray-100 min-h-screen py-12">
    <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl text-center font-semibold text-purple-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-purple-200 pb-4">
                <h3 className="text-xl font-medium text-purple-700 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
         
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Need More Help?</h2>
          <p className="text-gray-600 mb-6">If you need additional assistance with your account, our support team is here to help you.</p>
          <button className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition duration-300">
            Contact Support
          </button>
        </div>
        </div>
        </>
  );
}

export default faq;

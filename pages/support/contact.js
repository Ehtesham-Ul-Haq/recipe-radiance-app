import Head from 'next/head';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      setStatus('There was a problem sending your message. Please try again.');
    }
  };

  return (
    <>
    {/* Meta tags and page title */}
    <Head>
      <title>Contact us - Recipe Radiance - Share Delicious Recipes</title>
      <meta
        name="description"
        content="Explore and share a wide range of recipes on Recipe Radiance. Find delicious meals, desserts, and more with just a few clicks."
      />
      </Head>

    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Contact Us</h1>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {status && <p className={`mt-4 text-lg ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
        </div>

        <div className="mt-12 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect with Us</h2>
      <div className="flex justify-center space-x-6">
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1877F2] hover:text-[#145dbf] transition duration-300"
        >
          <FaFacebook className="text-3xl" />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1DA1F2] hover:text-[#1a91da] transition duration-300"
        >
          <FaTwitter className="text-3xl" />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C13584] hover:text-[#a12d72] transition duration-300"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://pinterest.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E60023] hover:text-[#c13520] transition duration-300"
        >
          <FaPinterest className="text-3xl" />
        </a>
        <a
          href="https://wa.me/923480788905"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:text-[#1bbd7e] transition duration-300"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default Contact;

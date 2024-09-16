/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { FaEnvelope, FaInfoCircle, FaQuestionCircle, FaShieldAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <div className='p-1 bg-primary text-white'>
        <div className='md:px-4 flex md:justify-between items-center'>
        <ul className='infobar flex space-x-6 text-xs'>
          <li><Link href={'/support/about'} className='flex items-center px-1 md:px-4 py-1 text-sm text-white hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'><FaInfoCircle /><span className='ml-2'>About</span></Link></li>
          <li><Link href={'/support/contact'} className='flex items-center px-1 md:px-4 py-1 text-sm text-white hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'><FaEnvelope /><span className='ml-2'>Contact</span></Link></li>
          <li><Link href={'/support/privacy'} className='flex items-center px-1 md:px-4 py-1 text-sm text-white hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'><FaShieldAlt /><span className='ml-2'>Privacy</span></Link></li>
          <li><Link href={'/support/help'} className='flex items-center px-1 md:px-4 py-1 text-sm text-white hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'><FaQuestionCircle /><span className='ml-2'>Help</span></Link></li>
        </ul>
        <div className="hidden md:block contact-info text-xs">
            <span>Email: info@reciperadiance.com | Phone: +923480788905</span>
        </div>
        </div>

      </div>
      
      <Navbar />
     
    </header>
  );
}

export default Header;


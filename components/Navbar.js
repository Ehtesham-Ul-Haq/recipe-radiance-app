import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaPlus,
  FaList,
  FaGlobe,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaPepperHot,
  FaHeart,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const [userId, setUserId] = useState(null);

  const [isOpenLang, setIsOpenLang] = useState(false);
  const [selectedOption, setSelectedOption] = useState("EN");

  const toggleDropdown = () => {
    setIsOpenLang(!isOpenLang);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpenLang(false); // Close the dropdown after selecting an option
  };

  // Check the login status from localStorage
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); // Assume you store a token in localStorage
    setIsLoggedIn(!!token); // If token exists, user is logged in
    // Check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user from localStorage

    if (loggedInUser) {
      setUserId(loggedInUser._id);
    }
  };

  useEffect(() => {
    // Check login status on component mount
    checkLoginStatus();

    // Listen for localStorage changes (e.g., login or logout)
    window.addEventListener("storage", checkLoginStatus);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  // Simulate login (replace with actual login check in real use case)
  const handleLogin = () => setIsLoggedIn(!isLoggedIn);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/recipes"); // Adjust API route as needed
        const data = await res.json();

        const allCategories = data.data.map((recipe) => recipe.category);
        const uniqueCategories = [...new Set(allCategories)]; // Set removes duplicates
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Search functionality
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `/api/recipes?search=${encodeURIComponent(searchQuery)}`
        ); // Adjust API route as needed
        const data = await res.json();
        setSearchResults(data.data || []); // Adjust based on API response
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/login"); // Redirect to login page after logout

    if (!toast.isActive("logout-toast")) {
      // Use a unique toast ID
      toast.info("Logout Successfull!", {
        toastId: "logout-toast", // Set a unique toastId
      });
    }
  };

  const navItems = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "All Recipes", link: "/allrecipes", icon: <FaPepperHot /> },
    { name: "Add Recipe", link: "/addrecipe", icon: <FaPlus /> },
    { name: "Categories", icon: <FaList />, dropdown: categories },
  ];

  const NavItem = ({ item }) => (
    <motion.li
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.link ? item.link : `/${item.name.toLowerCase()}`}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors duration-200"
      >
        {item.icon}
        <span className="ml-2">{item.name}</span>
      </Link>
      {item.dropdown && (
        <motion.ul
          className="absolute left-0 w-40 hidden group-hover:block bg-white shadow-lg rounded-md py-2 z-50 capitalize"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {item.dropdown.map((subItem) => (
            <li key={subItem}>
              <Link
                href={`/categories/${subItem}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900 z-50"
              >
                {subItem}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.li>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-24">
          <div className="flex items-center">
            <Link href={"/"}>
              <motion.img
                src="/img/logo-img-nav-1.png"
                alt="Recipe Radiance"
                className="h-20 w-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4 z-50">
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>

            <div className="relative cursor-pointer">
              {/* Selected option with Globe icon */}
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <FaGlobe />
                <span>{selectedOption.slice(0, 2)}</span>
                {/* Dropdown arrow */}
                {isOpenLang ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>

              {/* Options dropdown */}

              <AnimatePresence>
                {isOpenLang && (
                  <motion.div
                    className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      onClick={() => selectOption("ENGLISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ENGLISH
                    </span>
                    <span
                      onClick={() => selectOption("SPANISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      SPANISH
                    </span>
                    <span
                      onClick={() => selectOption("FRENCH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      FRENCH
                    </span>
                    <span
                      onClick={() => selectOption("GERMAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      GERMAN
                    </span>
                    <span
                      onClick={() => selectOption("ITALIAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ITALIAN
                    </span>
                    <span
                      onClick={() => selectOption("PORTUGUESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      PORTUGUESE
                    </span>
                    <span
                      onClick={() => selectOption("RUSSIAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      RUSSIAN
                    </span>
                    <span
                      onClick={() => selectOption("CHINESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      CHINESE
                    </span>
                    <span
                      onClick={() => selectOption("JAPANESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      JAPANESE
                    </span>
                    <span
                      onClick={() => selectOption("KOREAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      KOREAN
                    </span>
                    <span
                      onClick={() => selectOption("ARABIC")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ARABIC
                    </span>
                    <span
                      onClick={() => selectOption("HINDI")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      HINDI
                    </span>
                    <span
                      onClick={() => selectOption("TURKISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      TURKISH
                    </span>
                    <span
                      onClick={() => selectOption("URDU")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      URDU
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                >
                  <FaUser />
                  <span>Profile</span>
                </button>
                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/user/${userId}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        Visit Profile
                      </Link>
                      <Link
                        href={`/user/${userId}/favorites`}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 flex items-center"
                      >
                        Favorite
                        <FaHeart className="text-red-600 mx-2" />
                        Recipes
                      </Link>
                      <Link
                        href={`/user/${userId}/update`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        Update Profile
                      </Link>
                      <Link
                        href={`/user/${userId}/changepassword`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        Change Password
                      </Link>
                      <span
                        onClick={handleLogout}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        Logout
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                Login
              </Link>
            )}
            <div className="relative">
              <FaSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <AnimatePresence>
                {searchResults.length > 0 ? (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul>
                      {searchResults.map((result) => (
                        <li
                          key={result._id}
                          className="p-3 text-purple-950 rounded-md hover:text-white hover:bg-purple-950"
                        >
                          <Link
                            href={`/recipe/${result._id}`}
                            className="block"
                          >
                            {result.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : searchQuery ? ( // Only show "No recipes with this name" if searchQuery is not empty
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 p-3 text-center text-purple-950"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    No recipes with this name
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-900 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link ? item.link : `/${item.name.toLowerCase()}`}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-900 hover:bg-purple-50"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
              <div className="px-3 py-2">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={toggleUserDropdown}
                      className="flex items-center space-x-2 appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </button>
                    <AnimatePresence>
                      {showUserDropdown && (
                        <motion.div
                          className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={`/user/${userId}`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            Visit Profile
                          </Link>
                          <Link
                            href={`/user/${userId}/favorites`}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            Favorite
                            <FaHeart className="text-red-600 mx-2" />
                            Recipes
                          </Link>
                          <Link
                            href={`/user/${userId}/update`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            Update Profile
                          </Link>
                          <Link
                            href={`/user/${userId}/changepassword`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            Change Password
                          </Link>
                          <span
                            onClick={handleLogout}
                            className="block cursor-pointer px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            Logout
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="relative cursor-pointer px-3 py-2">
              {/* Selected option with Globe icon */}
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 appearance-none bg-transparent border border-gray-300 rounded-md px-5 py-2 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <FaGlobe />
                <span>{selectedOption.slice(0, 2)}</span>
                {/* Dropdown arrow */}
                {isOpenLang ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>

              {/* Options dropdown */}

              <AnimatePresence>
                {isOpenLang && (
                  <motion.div
                    className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      onClick={() => selectOption("ENGLISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ENGLISH
                    </span>
                    <span
                      onClick={() => selectOption("SPANISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      SPANISH
                    </span>
                    <span
                      onClick={() => selectOption("FRENCH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      FRENCH
                    </span>
                    <span
                      onClick={() => selectOption("GERMAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      GERMAN
                    </span>
                    <span
                      onClick={() => selectOption("ITALIAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ITALIAN
                    </span>
                    <span
                      onClick={() => selectOption("PORTUGUESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      PORTUGUESE
                    </span>
                    <span
                      onClick={() => selectOption("RUSSIAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      RUSSIAN
                    </span>
                    <span
                      onClick={() => selectOption("CHINESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      CHINESE
                    </span>
                    <span
                      onClick={() => selectOption("JAPANESE")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      JAPANESE
                    </span>
                    <span
                      onClick={() => selectOption("KOREAN")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      KOREAN
                    </span>
                    <span
                      onClick={() => selectOption("ARABIC")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      ARABIC
                    </span>
                    <span
                      onClick={() => selectOption("HINDI")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      HINDI
                    </span>
                    <span
                      onClick={() => selectOption("TURKISH")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      TURKISH
                    </span>
                    <span
                      onClick={() => selectOption("URDU")}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      URDU
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
              <div className="relative px-3 py-2">
                <FaSearch className="text-gray-500 absolute left-6 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

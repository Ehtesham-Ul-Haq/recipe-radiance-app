/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Loader from './Loader';

const RecipeForm = ({ initialRecipe = {} }) => {
  const [image, setImage] = useState(initialRecipe.image || '');
  const [name, setName] = useState(initialRecipe.name || '');
  const [description, setDescription] = useState(initialRecipe.description || '');
  const [category, setCategory] = useState(initialRecipe.category || '');
  const [ingredients, setIngredients] = useState(initialRecipe.ingredients || []);
  const [instructions, setInstructions] = useState(initialRecipe.instructions || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const router = useRouter();
 

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Recipe name is required';
    if (!category) newErrors.category = 'Please select a category';
    if (ingredients.every(ing => !ing.trim())) newErrors.ingredients = 'At least one ingredient is required';
    if (instructions.every(ins => !ins.trim())) newErrors.instructions = 'At least one instruction is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Recipe submitted successfully');
      setLoading(true);
      
      try {
        const recipeData = {
          image, 
          name, 
          description, 
          category, 
          ingredients, 
          instructions
        };
  
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
  
        // Set up the config for headers, including Authorization
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
          }
        };
  
        if (initialRecipe._id) {
          await axios.put(`/api/recipes/${initialRecipe._id}`, recipeData, config);
          console.log('Recipe updated successfully');
        } else {
          await axios.post('/api/recipes/add', recipeData, config);
          console.log('Recipe added successfully');
        }
  
        // Redirect or show success message
        router.push('/');
        
      } catch (error) {
        console.error(error);
        setError('Failed to submit recipe');
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
       {loading && <Loader />} {/* Show loader while loading */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">Create a New Recipe</h1>
          
          <div className="relative">
      {image ? (
        <div className="flex flex-col w-3/4 mx-auto items-start justify-start">
          <img
            src={image}
            id="prv"
            alt="image"
            className="w-full h-96 object-cover rounded-tl-[20px] rounded-tr-[20px]"
          />
          <label
            className="w-full bg-purple-300 block py-2 px-0 text-xl text-center rounded-b-full"
            htmlFor="prv"
          >
            Recipe Image Preview
          </label>
        </div>
      ) : null}

<label htmlFor="image" className="block text-sm font-medium text-gray-700">Recipe Image</label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 ${errors.image ? 'border-red-500' : ''}`}
              placeholder="Enter recipe image url"
            />
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
    </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter recipe name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter recipe description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter recipe description"
            />
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-grow p-2 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  placeholder={`Ingredient ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
            >
              <FaPlus className="mr-2" /> Add Ingredient
            </button>
            {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center mt-2">
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className="flex-grow p-2 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  placeholder={`Step ${index + 1}`}
                  rows="2"
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
            >
              <FaPlus className="mr-2" /> Add Instruction
            </button>
            {errors.instructions && <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>}
          </div>
        </div>



        <div className="mt-8">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
 
};

export default RecipeForm;

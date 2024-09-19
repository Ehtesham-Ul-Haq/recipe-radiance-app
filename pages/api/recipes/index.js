// get all recipes

import dbConnect from '../../../utils/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  await dbConnect();
  console.log('Database connected successfully'); // Ensure DB connection
  const { method } = req;
  const { sortBy, category, limit = 12, page = 1, search, userId } = req.query;

  switch (method) {
    case 'GET':
      try {
        let query = {}; // Initialize query object

        if (category) {
          query.category = category; // Add category filter to query
        }

        if (search) {
          // Add search filter to query to match name
          query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        if (userId) {
          query.user = userId; // Filter recipes by user ID if provided
        }

        const skip = (page - 1) * limit; // Calculate how many items to skip based on page and limit

        let recipes;
        if (sortBy === 'reviews') {
          // Get recipes sorted by the number of reviews in descending order
          recipes = await Recipe.find(query)
            .sort({ reviews: -1 })
            .skip(skip) // Skip based on page number
            .limit(parseInt(limit))
            .populate('user', '-password')
            .populate({
              path: 'reviews',
              populate: {
                path: 'userId',
                select: 'name' // Only populate the username field
              }
            });
        } else {
          // Get all recipes without sorting
          recipes = await Recipe.find(query)
            .skip(skip) // Skip based on page number
            .limit(parseInt(limit))
            .populate('user', '-password')
            .populate({
              path: 'reviews',
              populate: {
                path: 'userId',
                select: 'name' // Only populate the username field
              }
            });
        }

        const totalRecipes = await Recipe.countDocuments(query); // Get total number of recipes for pagination

        res.status(200).json({
          success: true,
          data: recipes,
          totalCount: totalRecipes, // Return the total number of recipes
          currentPage: page, // Return the current page
          totalPages: Math.ceil(totalRecipes / limit), // Calculate total pages
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not supported' });
      break;
  }
}

//  adding a new review

import dbConnect from '../../../utils/dbConnect';
import Recipe from '../../../models/Recipe';
import Review from '../../../models/Review';
import requireAuth from '../../../middleware/requireAuth';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      requireAuth(async (req, res) => {
        try {
          const { recipeId, rating, comment } = req.body;

          // Check if the recipe exists
          const recipe = await Recipe.findById(recipeId);
          if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
          }

          // Create new review
          const newReview = new Review({
            userId: req.user, // Extracted from JWT token
            // name: req.user.name,
            rating,
            comment,
            recipeId, // Link review to the recipe
          });

          const savedReview = await newReview.save();

          // Optionally, you can update the recipe with the review
          recipe.reviews.push(savedReview._id);
          await recipe.save();

          res.status(201).json({ success: true, data: savedReview });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      })(req, res);
      break;

    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}

import dbConnect from '../../../utils/dbConnect';
import Recipe from '../../../models/Recipe';
import Review from '../../../models/Review';
import requireAuth from '../../../middleware/requireAuth';

export default requireAuth(async (req, res) => {
  // Ensure database connection
  await dbConnect();
  const { method } = req;
  const { recipeId } = req.query;


  switch (method) {
    case 'POST':
      try {
        // Protect the route with authentication middleware

        const { rating, comment } = req.body;

        // Ensure rating and comment are provided
        if (!rating || !comment) {
          return res.status(400).json({ success: false, message: 'Rating and comment are required' });
        }

        // Check if the recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
          return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Check if the user already reviewed the recipe
        const existingReview = await Review.findOne({ userId: req.user, recipeId: recipeId });
        if (existingReview) {
          return res.status(400).json({ success: false, message: 'You have already reviewed this recipe' });
        }
        

        // Create new review
        const newReview = new Review({
          userId: req.user, // Assuming `req.user` contains the authenticated user's info
          rating,
          comment,
          recipeId, // Link review to the recipe
        });

        const savedReview = await newReview.save();

        // Add review ID to the recipe's reviews array
        recipe.reviews.push(savedReview._id);
        await recipe.save();

        res.status(201).json({ success: true, data: savedReview });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
});

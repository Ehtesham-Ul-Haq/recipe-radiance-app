// handling get, update, delete review

import dbConnect from '../../../utils/dbConnect';
import Review from '../../../models/Review';
import Recipe from '../../../models/Recipe'; // Import Recipe model to update reviews array
import requireAuth from '../../../middleware/requireAuth';
import mongoose from 'mongoose';


export default async function handler(req, res) {
  const { method } = req;
  const { reviewId } = req.query; // capture review id from url

  await dbConnect();

  switch (method) {
    
    case 'GET':
      try {
        const review = await Review.findById(reviewId).populate('userId', 'name');
        if (!review) {
          return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, data: review });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      requireAuth(async (req, res) => {
        try {
          const { rating, comment, recipeId } = req.body; // Only allow updates to rating and comment
          // Validate ObjectId
          if (!mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
          }
          const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comment },
            { new: true, runValidators: true }
          );
          if (!updatedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
          }
          // Optionally update the recipe
          const recipe = await Recipe.findById(recipeId);
          if (recipe) {
            // Update the recipe with the updated review if necessary
            // For example, you might want to recalculate average ratings or update review references

            // This example just pushes the review ID to the recipe's reviews array if not already present
            if (!recipe.reviews.includes(reviewId)) {
              recipe.reviews.push(reviewId);
              await recipe.save();
            }
          }
          res.status(200).json({ success: true, data: updatedReview });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      })(req, res);
      break;

    case 'DELETE':
      requireAuth(async (req, res) => {
        try {
          const review = await Review.findById(reviewId);
          if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
          }

          // Delete the review
          await Review.deleteOne({ _id: reviewId });

          // Remove the review from the corresponding recipe's reviews array
          await Recipe.findByIdAndUpdate(review.recipeId, {
            $pull: { reviews: reviewId }
          });

          res.status(200).json({ success: true, message: 'Review deleted' });
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

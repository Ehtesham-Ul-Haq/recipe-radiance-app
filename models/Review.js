import mongoose from 'mongoose';
import User from './User';
import Recipe from './Recipe';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true},
  // name: { type: String, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);

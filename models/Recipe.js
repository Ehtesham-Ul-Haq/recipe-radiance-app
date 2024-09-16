import mongoose from 'mongoose';
import Review from './Review';
import User from './User';

const recipeSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: [String],
  instructions: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});



export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

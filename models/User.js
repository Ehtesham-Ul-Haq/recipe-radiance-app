import mongoose from 'mongoose';
import Recipe from './Recipe';

const userSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoritesRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);

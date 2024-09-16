// (Get, Update, Delete Recipe) 

import dbConnect from '../../../utils/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const recipe = await Recipe.findById(id).populate('user', '-password').populate({
          path: 'reviews',
          populate: {
            path: 'userId',
            select: 'name' // Only populate the username field
          }
        });
        if (!recipe) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!recipe) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

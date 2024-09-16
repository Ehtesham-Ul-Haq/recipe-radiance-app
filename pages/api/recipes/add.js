// add recipe 

import dbConnect from '../../../utils/dbConnect';
import Recipe from '../../../models/Recipe';
import requireAuth from '../../../middleware/requireAuth';

export default requireAuth(async (req, res) => {
  await dbConnect();
  if (req.method === 'POST') {
    // Code to add a new recipe
    const { name, description, category, image, ingredients, instructions, userId } = req.body;
    console.log('Authenticated User:', req.user);
   
    try {
      const newRecipe = new Recipe({
      name, 
      description, 
      category,
      image,
      ingredients, 
      instructions,
      user: userId
    });
    await newRecipe.save();
    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
});

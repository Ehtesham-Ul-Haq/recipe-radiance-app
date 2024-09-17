import jwt from "jsonwebtoken";
import User from "@/models/User";
import Recipe from "@/models/Recipe";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { recipeId } = req.query; // Extract the recipeId from the URL query
  const { method } = req;

  if (method === "POST") {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      // Decode the token to extract the userId
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId; // Ensure this matches the field for the userId in your token
      console.log(userId);

      // Find the recipe by recipeId
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found", user });
      }

      // Check if the recipe is already in the user's favoritesRecipes array
      const isFavorite = user.favoritesRecipes?.includes(recipeId);
      if (isFavorite) {
        return res.status(400).json({ message: "Recipe already in favorites" });
      }

      // Add the recipe to the user's favoritesRecipes array and save the user
      user.favoritesRecipes.push(recipeId);
      await user.save();

      return res.status(200).json({ message: "Recipe added to favorites" });
    } catch (error) {
      console.error("Error adding favorite recipe:", error);
      return res.status(500).json({ error: "Failed to add favorite recipe" });
    }
  }

// Check if the request method is GET
  else if (method === 'GET') {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    try {
      // Decode the token to extract the userId
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId; // Ensure this matches the field for the userId in your token
      console.log(userId);
      // Find the user and populate the favorites
      const user = await User.findById(userId).populate('favoritesRecipes'); // Ensure favorites field is populated

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send the favorites list
      res.status(200).json({ favoritesRecipes: user.favoritesRecipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } 
  else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

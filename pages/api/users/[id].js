import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs'; // Make sure you have bcryptjs installed

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id).populate('favoritesRecipes');
        if (!user) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { password, ...otherData } = req.body;

        let updatedUserData = otherData;

        // If the password is being updated, hash it
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          updatedUserData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not supported' });
      break;
  }
}

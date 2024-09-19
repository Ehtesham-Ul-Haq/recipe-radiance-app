import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  const { email, name } = req.body;

  // Check if neither email nor name is provided
  if (!email && !name) {
    return res.status(400).json({ success: false, message: 'Email or name is required' });
  }

  try {
    let user;

    if (email) {
      // Find user by email
      user = await User.findOne({ email });
    } else if (name) {
      // Find user by name
      user = await User.findOne({ name });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Respond with the found user
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

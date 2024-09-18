// login 

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    const { email, password, token, type } = req.body;

    try {
      if (type === 'recipeRadiance') {
        // Standard login
        if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        return res.status(200).json({ success: true, token, userdata: user });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, error: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

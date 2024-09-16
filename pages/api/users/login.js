// login 

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    // Code to log in the user
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
}

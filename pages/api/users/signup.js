// signup

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    // Code to register a new user
    const { name, email, password } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}

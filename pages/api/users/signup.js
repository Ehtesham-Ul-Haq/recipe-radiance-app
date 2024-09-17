// signup

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === 'POST') {
    const { type, image, name, email, password, token } = req.body;

    try {
      if (type === 'recipeRadiance') {
        // Recipe Radiance (traditional) Signup
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, image, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ success: true, data: newUser });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid signup type' });
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}

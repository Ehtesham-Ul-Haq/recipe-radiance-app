import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash passwords
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Function to compare password and hashed password
export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

// Function to create a JWT token
export const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

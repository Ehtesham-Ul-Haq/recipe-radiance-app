
import jwt from 'jsonwebtoken';

export default function requireAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
  ? req.headers.authorization.split(' ')[1]
  : null;

    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded); // Debugging line
      req.user = decoded.userId;
      return handler(req, res);
    } catch (error) {
      console.error('JWT Verification Error:', error); // Debugging line
      res.status(401).json({ success: false, message: "cateched Unauthorized" });
    }
  };
}

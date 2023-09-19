import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const verifyToken = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(403);
    throw new Error('Not Authenticated, no token!');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id).select('-password');
  } catch (error) {
    res.status(403);
    throw new Error('Not Authenticated, invalid token!');
  }

  next();
});

export { verifyToken };

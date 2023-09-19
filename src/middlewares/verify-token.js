import asyncHandler from 'express-async-handler';
import User from '../models/user';
import { decodeToken } from '../utils/decode-token';

const verifyToken = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(403);
    throw new Error('Not Authenticated: no token provided!');
  }

  try {
    const { id } = decodeToken(token);

    req.user = await User.findById(id).select('-password');
  } catch (error) {
    res.status(403);
    throw new Error('Not Authenticated: invalid token!');
  }

  next();
});

export { verifyToken };

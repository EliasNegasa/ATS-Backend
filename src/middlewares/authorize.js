import asyncHandler from 'express-async-handler';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (user.role.toUpperCase() === 'SUPERADMIN') {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized, Super Admin role is required!');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (user.role.toUpperCase() === 'ADMIN') {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized, Admin role is required!');
  }
});

const isCandidate = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (user.role.toUpperCase() === 'CANDIDATE') {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized, Candidate role is required!');
  }
});

export { isAdmin, isCandidate, isSuperAdmin };

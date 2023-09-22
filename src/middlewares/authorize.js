import asyncHandler from 'express-async-handler';
import User from '../models/user';
import { decodeToken } from '../utils/decode-token';

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  const { id } = decodeToken(token);

  const user = await User.findById(id);

  if (user.role.toUpperCase() === 'SUPER ADMIN') {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized: Super Admin role is required!');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  const { id } = decodeToken(token);

  const user = await User.findById(id);

  if (
    user.role.toUpperCase() === 'ADMIN' ||
    user.role.toUpperCase() === 'SUPER ADMIN'
  ) {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized: Admin role is required!');
  }
});

const isCandidate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  const { id } = decodeToken(token);

  const user = await User.findById(id);

  if (user.role.toUpperCase() === 'CANDIDATE') {
    next();
    return;
  } else {
    res.status(403);
    throw new Error('Not Authorized: Candidate role is required!');
  }
});

export { isAdmin, isCandidate, isSuperAdmin };

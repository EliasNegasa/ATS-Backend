import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateToken from '../utils/generate-token.js';

const signUp = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('Invalid email or password');
  }
});

const profile = asyncHandler(async (req, res) => {
  const user = {
    // _id: user._id,
    // firstName: user.firstName,
    // lastName: user.lastName,
    // email: user.email,
    // role: user.role,
  };

  res.status(200).json({ message: 'User Profile' });
});

const signOut = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

export { signIn, signUp, signOut, profile };

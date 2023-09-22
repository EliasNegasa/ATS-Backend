import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateToken from '../utils/generate-token.js';

const signUp = asyncHandler(async (req, res) => {
  req.body.role = 'Candidate';

  const user = await User.create(req.body);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    token: generateToken(user._id),
  });
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.isActive && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid email or password');
  }
});

const profile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const signOut = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged out' });
});

export { signIn, signUp, signOut, profile };

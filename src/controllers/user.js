import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateUrl from '../utils/generate-url';

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort, ...filterQueries } = req.query;

  const total = await User.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    throw new Error('Page not Found');
  }

  const users = await User.find(filterQueries)
    .select('-password')
    .collation({ locale: 'en', strength: 2 })
    .sort(sort || '-createdAt')
    .skip((page - 1) * limit)
    .limit(+limit);

  res.status(200).json({
    metadata: {
      total,
      page: +page,
      limit: +limit,
    },
    links: {
      prev: page > 1 ? generateUrl(page - 1, limit, sort, 'users') : null,
      self: req.originalUrl,
      next:
        page * limit < total
          ? generateUrl(+page + 1, limit, sort, 'users')
          : null,
    },
    data: users,
  });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const options = {
    new: true,
    runValidators: true,
  };

  const updatedUser = await User.findByIdAndUpdate(id, req.body, options);

  if (!updatedUser) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.status(204).json({ message: 'User Deleted' });
});

export { getUserById, getUsers, createUser, updateUser, deleteUser };

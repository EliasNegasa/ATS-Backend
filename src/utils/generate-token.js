import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
  let token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 1000,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
};

export default generateToken;

import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export { decodeToken };

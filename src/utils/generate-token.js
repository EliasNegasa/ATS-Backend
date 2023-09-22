import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  let token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '30m',
  });

  return token;
};

export default generateToken;

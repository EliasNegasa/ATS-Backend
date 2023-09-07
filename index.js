import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './src/routes';
import { errorHandler, notFound } from './src/middlewares/error';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Running on', PORT);
});

import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv/config';
import connectDB from './config/db';
import router from './src/routes';
import authRouter from './src/routes/auth';
import { errorHandler, notFound } from './src/middlewares/error';

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Running on', PORT);
});
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './src/routes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Running on', PORT);
});

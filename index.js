import express from 'express';
import router from './src/routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Running on', PORT);
});

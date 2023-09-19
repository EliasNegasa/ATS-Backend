import { Router } from 'express';
import jobRouter from './job';
import userRouter from './user';

const router = Router();

router.use('/jobs', jobRouter);
router.use('/users', userRouter);

export default router;

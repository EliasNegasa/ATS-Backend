import { Router } from 'express';
import jobsRouter from './jobs';

const router = Router();

router.use('/jobs', jobsRouter);

export default router;

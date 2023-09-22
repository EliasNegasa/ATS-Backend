import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from '../controllers/job';
import { verifyToken } from '../middlewares/verify-token';
import { isAdmin, isSuperAdmin } from '../middlewares/authorize';

const router = Router();

router
  .route('/')
  .get(getJobs)
  .post([verifyToken, isAdmin, isSuperAdmin], createJob);

router
  .route('/:id')
  .get(getJobById)
  .patch([verifyToken, isAdmin, isSuperAdmin], updateJob)
  .delete([verifyToken, isAdmin, isSuperAdmin], deleteJob);

export default router;

import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from '../controllers/job';
import { verifyToken } from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/authorize';

const router = Router();

router.route('/').get(getJobs).post(verifyToken, createJob);

router
  .route('/:id')
  .get(getJobById)
  .patch(verifyToken, updateJob)
  .delete(verifyToken, deleteJob);

export default router;

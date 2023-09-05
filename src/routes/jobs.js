import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from '../controllers/jobs';

const router = Router();

router.route('/').get(getJobs).post(createJob);

router.route('/:id(\\d+)').get(getJobById).put(updateJob).delete(deleteJob);

export default router;

import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from '../controllers/job';

const router = Router();

router.route('/').get(getJobs).post(createJob);

router.route('/:id').get(getJobById).patch(updateJob).delete(deleteJob);

export default router;

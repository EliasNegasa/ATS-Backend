import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user';
import { isSuperAdmin } from '../middlewares/authorize';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router
  .route('/')
  .all([verifyToken, isSuperAdmin])
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .all(verifyToken, isSuperAdmin)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;

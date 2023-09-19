import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user';
import { isSuperAdmin } from '../middlewares/authorize';

const router = Router();

router.route('/').all(isSuperAdmin).get(getUsers).post(createUser);

router
  .route('/:id')
  .all(isSuperAdmin)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;

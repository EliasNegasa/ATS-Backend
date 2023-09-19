import { Router } from 'express';
import { profile, signIn, signOut, signUp } from '../controllers/auth';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.route('/login').post(signIn);
router.route('/signup').post(signUp);
router.route('/profile').get(verifyToken, profile);
router.route('/logout').post(signOut);

export default router;

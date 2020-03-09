import {Router} from 'express';
import UserController from './controllers/UserController';
const router = Router();
router.get('/user', UserController.index)
router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);
export default router;
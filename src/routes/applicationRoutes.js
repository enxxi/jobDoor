import { Router } from 'express';
import { applicationController } from '../controllers/applicationController.js';

const applicationRouter = Router();

applicationRouter.post('/:postId', applicationController.create);
export { applicationRouter };

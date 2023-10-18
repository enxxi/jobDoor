import { Router } from 'express';
import { applicationController } from '../controllers/applicationController.js';
import { postParamsValidate } from '../middlewares/postParamsValidate.js';

const applicationRouter = Router();

applicationRouter.post('/:postId', postParamsValidate, applicationController.create);
export { applicationRouter };

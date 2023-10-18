import { Router } from 'express';
import { postController } from '../controllers/postController.js';
import { createPostValidate, createPostValidationRules } from '../middlewares/createPostValidate.js';
import { postParamsValidate } from '../middlewares/postParamsValidate.js';
import { setPostValidate, setPostValidationRules } from '../middlewares/setPostValidate.js';

const postRouter = Router();

postRouter.post('/', createPostValidationRules, createPostValidate, postController.createPost);

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:postId', postParamsValidate, postController.getPostDetail);

postRouter.patch('/:postId', postParamsValidate, setPostValidationRules, setPostValidate, postController.patchPost);

postRouter.delete('/:postId', postParamsValidate, postController.deletePost);

export { postRouter };

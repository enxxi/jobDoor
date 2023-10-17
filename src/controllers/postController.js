import { postService } from '../services/postService.js';
import { setOKResponse, setCreatedResponse } from '../utils/statusCode.js';

const postController = {
    createPost: async (req, res, next) => {
        try {
            const newPost = req.body;
            const post = await postService.createPost(newPost);
            setCreatedResponse(res);
            return res.send(post.message);
        } catch (error) {
            next(error);
        }
    },
    getAllPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAllPosts();
            setOKResponse(res);
            return res.send(posts);
        } catch (error) {
            next(error);
        }
    },
    getPostDetail: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const post = await postService.getPostDetail(postId);
            setOKResponse(res);
            return res.send(post);
        } catch (error) {
            next(error);
        }
    },
    patchPost: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const updatedPostData = req.body;
            const updatedPost = await postService.patchPost({ postId, updatedPostData });
            setOKResponse(res);
            return res.send(updatedPost.message);
        } catch (error) {
            next(error);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const deletedPost = await postService.deletePost(postId);
            setOKResponse(res);
            return res.send(deletedPost.message);
        } catch (error) {
            next(error);
        }
    },
};
export { postController };

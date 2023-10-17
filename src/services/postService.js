import { postRepository } from '../database/repositories/postRepository.js';
import { InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { formatPosts, formatPost } from '../utils/formatPost.js';

const postService = {
    createPost: async newPost => {
        try {
            await postRepository.create(newPost);
            return { message: '채용 공고 작성에 성공했습니다.' };
        } catch (error) {
            throw new InternalServerError('채용 공고 작성을 실패했습니다.');
        }
    },
    getAllPosts: async () => {
        try {
            const posts = await postRepository.getAllPosts();
            const formattedPosts = formatPosts(posts);
            return formattedPosts;
        } catch (error) {
            throw new InternalServerError('채용 공고 전체 조회를 실패했습니다.');
        }
    },
    getPostDetail: async postId => {
        try {
            const post = await postRepository.getPostDetail(postId);
            if (!post) {
                throw new NotFoundError('해당 id의 공고를 찾을 수 없습니다.');
            }
            console.log(post);

            const formattedPost = formatPost(post);

            return formattedPost;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('채용 공고 조회를 실패했습니다.');
            }
        }
    },
    patchPost: async ({ postId, updatedPostData }) => {
        try {
            const post = await postRepository.getPostById(postId);
            if (!post) {
                throw new NotFoundError('해당 id의 공고를 찾을 수 없습니다.');
            }
            await postRepository.patchPost({ postId, updatedPostData });
            return { message: '채용 공고 수정에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('채용 공고 삭제를 실패했습니다.');
            }
        }
    },
    deletePost: async postId => {
        try {
            const post = await postRepository.getPostById(postId);
            if (!post) {
                throw new NotFoundError('해당 id의 공고를 찾을 수 없습니다.');
            }
            await postRepository.deletePost(postId);
            return { message: '채용 공고 삭제에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('채용 공고 삭제를 실패했습니다.');
            }
        }
    },
};

export { postService };

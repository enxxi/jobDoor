import { postRepository } from '../database/repositories/postRepository.js';
import { InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';
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
    getAllPosts: async searchQuery => {
        try {
            let posts;

            if (searchQuery) {
                posts = await postRepository.getSearchedPosts(searchQuery);
            } else {
                posts = await postRepository.getAllPosts();
            }
            const formattedPosts = formatPosts(posts);
            return formattedPosts;
        } catch (error) {
            throw new InternalServerError('채용 공고 전체 조회를 실패했습니다.');
        }
    },
    getPostDetail: async postId => {
        try {
            const post = await postRepository.getPostDetail(postId);
            throwNotFoundError(post, '채용 공고');

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
            throwNotFoundError(post, '채용 공고');

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
            throwNotFoundError(post, '채용 공고');

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

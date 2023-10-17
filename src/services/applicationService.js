import { applicationRepository } from '../database/repositories/applicationRepository.js';
import { postRepository } from '../database/repositories/postRepository.js';
import { BadRequestError, InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';

const applicationService = {
    create: async ({ postId, userId }) => {
        try {
            const post = await postRepository.getPostById(postId);
            throwNotFoundError(post, '채용 공고');

            const checkApplication = await applicationRepository.getApplicationById({ postId, userId });
            if (checkApplication) {
                throw new BadRequestError('해당 채용 공고에 지원한 내역이 있습니다.');
            }

            await applicationRepository.create({ postId, userId });

            return { message: '채용 공고에 지원이 완료되었습니다.' };
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('채용 공고에 지원을 실패했습니다.');
            }
        }
    },
};

export { applicationService };

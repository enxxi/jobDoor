import { db } from '../models/index.js';
const applicationRepository = {
    create: async ({ postId, userId }) => {
        await db.Application.create({ postId, userId });
    },
    getApplicationById: async ({ postId, userId }) => {
        const application = await db.Application.findOne({
            where: { postId, userId },
        });

        return application;
    },
};

export { applicationRepository };

import { db } from '../models/index.js';
import { Op } from 'sequelize';

const postRepository = {
    create: async newPost => {
        await db.Post.create(newPost);
    },
    getAllPosts: async () => {
        const posts = await db.Post.findAll({
            attributes: ['id', 'position', 'award', 'skill'],
            include: [{ model: db.Company, attributes: ['name', 'nation', 'country'] }],
            raw: true,
        });
        return posts;
    },
    getPostDetail: async postId => {
        const post = await db.Post.findOne({
            where: { id: postId },
            attributes: ['id', 'position', 'skill', 'award', 'content'],
            include: [
                {
                    model: db.Company,
                    attributes: ['id', 'name', 'nation', 'country'],
                    include: [{ model: db.Post, attributes: ['id'] }],
                },
            ],
        });
        return post;
    },
    getPostById: async postId => {
        const post = await db.Post.findOne({ where: { id: postId } });
        return post;
    },
    patchPost: async ({ postId, updatedPostData }) => {
        const updatedPost = await db.Post.update(updatedPostData, {
            where: { id: postId },
        });

        return updatedPost;
    },
    deletePost: async postId => {
        const post = await db.Post.destroy({ where: { id: postId } });
        return post;
    },
};
export { postRepository };

import { db } from '../models/index.js';
import { Op } from 'sequelize';

const postRepository = {
    create: async newPost => {
        await db.Post.create(newPost);
    },
    getSearchedPosts: async searchQuery => {
        const posts = await db.Post.findAll({
            where: {
                [Op.or]: [
                    {
                        skill: {
                            [Op.like]: `%${searchQuery}%`,
                        },
                    },
                    {
                        '$Company.name$': {
                            [Op.like]: `%${searchQuery}%`,
                        },
                    },
                    {
                        position: {
                            [Op.like]: `%${searchQuery}%`,
                        },
                    },
                ],
            },
            attributes: ['id', 'position', 'award', 'skill'],
            include: [{ model: db.Company, attributes: ['name', 'nation', 'country'] }],
            raw: true,
        });
        return posts;
    },
    getAllPosts: async () => {
        try {
            const posts = await db.Post.findAll({
                attributes: ['id', 'position', 'award', 'skill'],
                include: [{ model: db.Company, attributes: ['name', 'nation', 'country'] }],
                raw: true,
            });
            return posts;
        } catch (e) {
            console.log(e);
        }
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

import { db } from '../models/index.js';

const userRepository = {
    getUserById: async userId => {
        const user = await db.User.findOne({ where: { id: userId } });
        return user;
    },
};
export { userRepository };

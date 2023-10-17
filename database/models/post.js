'use strict';
import { Model } from 'sequelize';
const Post = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {}
    }
    Post.init(
        {
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            award: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            skill: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Post',
            underscored: true,
            paranoid: true,
        },
    );
    return Post;
};
export { Post };

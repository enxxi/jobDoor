'use strict';
import { Model } from 'sequelize';
const Post = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.Company, { foreignKey: 'companyId' });
        }
    }
    Post.init(
        {
            position: {
                type: DataTypes.STRING,
                allowNull: false,
                indexes: [{ fields: ['position'], using: 'BTREE', name: 'position_index' }],
            },
            award: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            skill: {
                type: DataTypes.STRING,
                allowNull: false,
                indexes: [{ fields: ['skill'], using: 'BTREE', name: 'skill_index' }],
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
            // paranoid: true, : soft delete
        },
    );
    return Post;
};
export { Post };

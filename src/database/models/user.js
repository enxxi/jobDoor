'use strict';
import { Model } from 'sequelize';
const User = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {}
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            skill: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            underscored: true,
        },
    );
    return User;
};

export { User };

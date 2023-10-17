'use strict';
import { Model } from 'sequelize';
const Application = (sequelize, DataTypes) => {
    class Application extends Model {
        static associate(models) {
            Application.belongsTo(models.User, { foreignKey: 'userId' });
            Application.belongsTo(models.Post, { foreignKey: 'postId' });
        }
    }
    Application.init(
        {},
        {
            sequelize,
            modelName: 'Application',
            underscored: true,
        },
    );
    return Application;
};

export { Application };

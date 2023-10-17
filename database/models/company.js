'use strict';
import { Model } from 'sequelize';
const Company = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate(models) {
            Company.hasMany(models.Post, { foreignKey: 'companyId' });
        }
    }
    Company.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nation: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Company',
            underscored: true,
        },
    );
    return Company;
};

export { Company };

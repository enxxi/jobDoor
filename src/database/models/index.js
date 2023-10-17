'use strict';
import Sequelize from 'sequelize';
import { config } from '../config/config.js';
const env = process.env.NODE_ENV || 'development';

import { User } from './user.js';
import { Company } from './company.js';
import { Post } from './post.js';
import { Application } from './application.js';

const db = {};

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    port: config[env].port,
    dialect: config[env].dialect,
    logging: false,
});

db.User = User(sequelize, Sequelize);
db.Company = Company(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Application = Application(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db };

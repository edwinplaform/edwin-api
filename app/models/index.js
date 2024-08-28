// const dbConfig = require('../config/db.config.js');

import {Sequelize} from "sequelize";
import UserModel from "./user.model.js"
import dbConfig from "../config/db.config.js";
import CourseModel from "./course.model.js";

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.user = require("user.model.js") (sequelize, Sequelize);
db.user = UserModel(sequelize)
db.course = CourseModel(sequelize)

export default db;

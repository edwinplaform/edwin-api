import {DataTypes} from 'sequelize'
import bcrypt from "bcrypt";

export default (sequelize) => {
    const ModelUser = sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role : {
            type: DataTypes.STRING,
        }
    });

    return ModelUser;

}



import {DataTypes} from 'sequelize'
import bcrypt from "bcrypt";

export default (sequelize) => {
    const UserModel = sequelize.define('Users', {
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        clerk_user_id: {
            type: DataTypes.STRING,
            unique: true,
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
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        profile_photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role : {
            type: DataTypes.ENUM('student','tutor','admin'),
            allowNull: false,
        }
    },
        {timestamps: true});

    return UserModel;

}
// export default ModelUser;



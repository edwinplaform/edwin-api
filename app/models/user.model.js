import {DataTypes} from 'sequelize'

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
            allowNull: false,
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
        profile_photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false,
            is:/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        },
        role : {
            type: DataTypes.ENUM('student','tutor','admin'),
            allowNull: false,
            defaultValue:'student',
        }
    },
        {timestamps: true});

    return UserModel;

}

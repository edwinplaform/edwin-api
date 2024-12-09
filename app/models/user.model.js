import {DataTypes} from 'sequelize'

export default (sequelize) => {
    const UserModel = sequelize.define('Users', {
            userId: {
                primaryKey: true,
                type: DataTypes.STRING,
                unique: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                is: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('STUDENT', 'TUTOR', 'ADMIN'),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            timestamps: false,
        });

    return UserModel;

}

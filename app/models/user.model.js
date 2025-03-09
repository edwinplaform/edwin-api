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
                allowNull: true
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                // unique: true,
                is: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                // unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profilePhotoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM('STUDENT', 'TUTOR', 'ADMIN'),
                allowNull: false,
            },
            isOnboarding: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otpExpiresAt: {
                type: DataTypes.DATE,
                allowNull: true,
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

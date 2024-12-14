import {DataTypes} from "sequelize";

export default (sequelize) => {
    const ReviewModel = sequelize.define("Review", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Sessions',
                key: 'id'
            }
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        tutorId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: true
    });

    return ReviewModel;
};
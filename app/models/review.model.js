import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ReviewModel = sequelize.define("Review", {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
        },
    }, {timestamps: true});

    return ReviewModel;

};
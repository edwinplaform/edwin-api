import {DataTypes} from "sequelize";

export default (sequelize) => {
    const TutorModel = sequelize.define("Tutor", {
        userId:{
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'userId',
            }
        },
        subjects: {
            type: DataTypes.JSON,
            allowNull: false
        },
        qualifications:{
            type: DataTypes.JSON,
            allowNull: true
        },
        availability:{
            type: DataTypes.JSON,
            allowNull: true
        },
        certificateUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        currency: {
            type: DataTypes.ENUM("LKR", "USD"),
            defaultValue: "LKR",
        },
        hourlyRate: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("ACCEPTED","REJECTED","PENDING"),
            defaultValue: "PENDING"
        }
    },{
        timestamps:false,
    });

    return TutorModel;
}
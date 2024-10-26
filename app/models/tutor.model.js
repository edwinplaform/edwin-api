import {DataTypes} from "sequelize";

export default (sequelize) => {
    const TutorModel = sequelize.define("Tutor", {
        tutor_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isVerified:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        hourly_rate: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        qualification:{
            type: DataTypes.JSON,
            allowNull: false,
        },
        proof_url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        availability: {
            type: DataTypes.JSON,
        },
    });

    return TutorModel;
}
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
        years_of_experience: {
          type: DataTypes.INTEGER,
          validate: {
              min: 0,
              max:50
          }
        },
        teaching_languages: {
          type: DataTypes.JSON,
        },
        total_students_taught: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        average_rating: {
            type: DataTypes.DECIMAL(3,2),
            defaultValue:0,
            validate: {
                min: 0,
                max: 5
            }
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
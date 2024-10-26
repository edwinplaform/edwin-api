import { DataTypes } from "sequelize";

export default (sequelize) => {
    const TutorAvailabilityModel = sequelize.define("TutorAvailability", {
        availability_id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        day_of_week : {
            type: DataTypes.ENUM('MONDAY', 'TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'),
            allowNull: false,
        },
        start_time : {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time : {
            type: DataTypes.TIME,
            allowNull: false,
        }
    }, {timestamps: false});


    return TutorAvailabilityModel;
    
};
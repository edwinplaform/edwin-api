import { DataTypes } from "sequelize";

export default (sequelize) => {
    const AppointmentModel = sequelize.define("Appointment", {
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        appointment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        appointment_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending','accepted','declined','completed'),
            defaultValue: 'pending',
        },
        zoom_link : {
            type: DataTypes.STRING,
        },

    }, {timestamps: true});

    return AppointmentModel;
    
}
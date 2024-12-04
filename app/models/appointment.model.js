import {DataTypes} from "sequelize";

export default (sequelize) => {
    const AppointmentModel = sequelize.define("Appointment", {
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        proposed_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('PENDING','CONFIRMED','REJECTED'),
            defaultValue: 'PENDING',
        },
        proposed_rate: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rejected_reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    return AppointmentModel;
}
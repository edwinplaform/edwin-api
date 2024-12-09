import {DataTypes} from "sequelize";

export default (sequelize) => {
    const SessionModel = sequelize.define("Session", {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        appointmentId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Appointments',
                key: 'id',
            }
        },
        studentId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model:'Users',
                key: 'userId',
            }
        },
        tutorId:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model:'Users',
                key: 'userId',
            }
        },
        subject:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        zoomLink:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        materialUrl:{
            type: DataTypes.JSON,
            allowNull: true,
        },
        status:{
            type: DataTypes.ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
            defaultValue:'SCHEDULED'
        }

    }, {
        timestamps:true
    });

    return SessionModel;

}
// session_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
// },
// subject: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// session_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
// },
// start_time: {
//     type: DataTypes.TIME,
//     allowNull: false,
// },
// end_time: {
//     type: DataTypes.DATE,
//     allowNull: false,
// },
// duration_minutes: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
// },
// status: {
//     type: DataTypes.ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'IN_PROGRESS'),
//     defaultValue: 'SCHEDULED',
// },
// zoom_link: {
//     type: DataTypes.STRING,
// },
// cancellation_reason: {
//     type: DataTypes.TEXT,
// },
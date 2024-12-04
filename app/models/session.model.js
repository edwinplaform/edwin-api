import {DataTypes} from "sequelize";

export default (sequelize) => {
    const SessionModel = sequelize.define("Session", {
        session_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'IN_PROGRESS'),
            defaultValue: 'SCHEDULED',
        },
        zoom_link: {
            type: DataTypes.STRING,
        },
        cancellation_reason: {
            type: DataTypes.TEXT,
        },
    }, {
        hooks: {
            beforeCreate: (session) => {
                session.duration_minutes = (session.end_time - session.session_date)
            }
        }
    });

    return SessionModel;

}
import {DataTypes} from "sequelize";

export default (sequelize) => {
    const SessionModel = sequelize.define(
        "Session",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
            },
            appointmentId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "Appointments",
                    key: "id",
                },
            },
            studentId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "userId",
                },
            },
            tutorId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "userId",
                },
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            startTime: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            endTime: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            zoomLink: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            zoomMeetingId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            materialUrl: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM(
                    "PENDING",
                    "SCHEDULED",
                    "IN_PROGRESS",
                    "COMPLETED",
                    "CANCELED"
                ),
                defaultValue: "PENDING",
            },
        },
        {
            timestamps: true,
        }
    );
    return SessionModel;
};

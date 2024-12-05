import {DataTypes} from "sequelize";

export default (sequelize) => {
    const AppointmentModel = sequelize.define("Appointment", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Users",
                key: "userId"
            }
        },
        tutorId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Users",
                key: "userId"
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
            defaultValue: 'PENDING'
        },
        rejectReason: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true
    });

    return AppointmentModel;
}
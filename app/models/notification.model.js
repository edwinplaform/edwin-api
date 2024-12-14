import {DataTypes} from "sequelize";

export default (sequelize) => {
    const NotificationModel = sequelize.define('Notification', {
        notification_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipient_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId',
            }
        },
        type: {
            type: DataTypes.ENUM('BOOKING', 'PAYMENT', 'MESSAGE', 'REVIEW', 'SYSTEM')
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return NotificationModel;
}

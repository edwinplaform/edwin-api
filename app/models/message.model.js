import { DataTypes } from "sequelize";

export default (sequelize) => {
    const MessageModel = sequelize.define("Message", {
        message_id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content : {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {timestamps: false });

    return MessageModel;
    
};
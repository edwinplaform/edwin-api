import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ResourceModel = sequelize.define("Resource", {
        resource_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.TEXT,
        },
        filepath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: true});

    return ResourceModel;
    
}
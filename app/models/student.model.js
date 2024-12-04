import { DataTypes } from "sequelize";

export default (sequelize) => {
    const StudentModel = sequelize.define("Student", {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'Users',
                key: "userId",
            }
        },
        subjects:{
            type: DataTypes.JSON,
            allowNull: false
        }
    },{
        timestamps: false,
    });

    return StudentModel;
}
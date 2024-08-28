import {DataTypes} from "sequelize";

export default (sequelize) => {
    const ModelCourse = sequelize.define("Courses", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    return ModelCourse;
}
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const StudentModel = sequelize.define("Student", {
        student_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    });

    return StudentModel;
}
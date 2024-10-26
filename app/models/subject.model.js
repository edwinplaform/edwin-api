import { DataTypes } from "sequelize";

export default (sequelize) => {
    const SubjectModel = sequelize.define("subject", {
        subject_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: false})

    return SubjectModel;

};
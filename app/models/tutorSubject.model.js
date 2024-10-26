import { DataTypes } from "sequelize";

export default (sequelize) => {
    const TutorSubjectModel = sequelize.define("TutorSubject", {
        tutor_subject_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {timestamps: false});

    return TutorSubjectModel;

};
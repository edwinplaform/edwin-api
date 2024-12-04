import {DataTypes} from "sequelize";

export default (sequelize) => {
    const TutorModel = sequelize.define("Tutor", {
        userId:{
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'userId',
            }
        },
        subjects: {
            type: DataTypes.JSON,
            allowNull: false
        },
        qualifications:{
            type: DataTypes.JSON,
            allowNull: true
        },
        availability:{
            type: DataTypes.JSON,
            allowNull: true
        },
        certificateUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        currency: {
            type: DataTypes.ENUM("LKR", "USD"),
            defaultValue: "LKR",
        },
        hourlyRate: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("ACCEPTED","REJECTED","PENDING"),
            defaultValue: "PENDING"
        }
        // isVerified:{
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
        // hourly_rate: {
        //     type: DataTypes.DECIMAL(5,2),
        //     allowNull: false,
        // },
        // description: {
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        // },
        // years_of_experience: {
        //   type: DataTypes.INTEGER,
        //   validate: {
        //       min: 0,
        //       max:50
        //   }
        // },
        // teaching_languages: {
        //   type: DataTypes.JSON,
        // },
        // total_students_taught: {
        //     type: DataTypes.INTEGER,
        //     defaultValue: 0,
        // },
        // average_rating: {
        //     type: DataTypes.DECIMAL(3,2),
        //     defaultValue:0,
        //     validate: {
        //         min: 0,
        //         max: 5
        //     }
        // },
        // qualification:{
        //     type: DataTypes.JSON,
        //     allowNull: false,
        // },
        // proof_url:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // availability: {
        //     type: DataTypes.JSON,
        // },
    },{
        timestamps:false,
    });

    return TutorModel;
}
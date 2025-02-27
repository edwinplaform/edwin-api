// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const SessionModel = sequelize.define(
//     "Session",
//     {
//       id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         unique: true,
//       },
//       appointmentId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//           model: "Appointments",
//           key: "id",
//         },
//       },
//       studentId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//           model: "Users",
//           key: "userId",
//         },
//       },
//       tutorId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//           model: "Users",
//           key: "userId",
//         },
//       },
//       subject: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       startTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       endTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       zoomLink: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       materialUrl: {
//         type: DataTypes.JSON,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.ENUM(
//           "PENDING",
//           "SCHEDULED",
//           "IN_PROGRESS",
//           "COMPLETED",
//           "CANCELLED"
//         ),
//         defaultValue: "PENDING",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

//   return SessionModel;
// };

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const SessionModel = sequelize.define(
    "Session",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      appointmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Appointments",
          key: "id",
        },
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      tutorId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zoomLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      materialUrl: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "SCHEDULED",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELED"
        ),
        defaultValue: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );
  return SessionModel;
};

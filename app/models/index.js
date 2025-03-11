import {Sequelize} from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModelFunc from "./user.model.js"
import StudentModelFunc from "./student.model.js";
import TutorModelFunc from "./tutor.model.js";
import SessionModelFunc from "./session.model.js";
import InvoiceModelFunc from "./invoice.model.js";
import ReviewModelFunc from "./review.model.js";
import SubjectModelFunc from "./subject.model.js";
import AppointmentModelFunc from "./appointment.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool,
});

sequelize.authenticate().then(() => {
    console.log("Connected successfully");
}).catch((err) => {
    console.log("Error connecting to database!");
});

const UserModel = UserModelFunc(sequelize);
const TutorModel = TutorModelFunc(sequelize);
const StudentModel = StudentModelFunc(sequelize);
const SessionModel = SessionModelFunc(sequelize);
const InvoiceModel = InvoiceModelFunc(sequelize);
const ReviewModel = ReviewModelFunc(sequelize);
const SubjectModel = SubjectModelFunc(sequelize);
const AppointmentModel = AppointmentModelFunc(sequelize);

// User to Tutor and Student 1 to 1
UserModel.hasOne(TutorModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
TutorModel.belongsTo(UserModel, {foreignKey: 'userId'});

UserModel.hasOne(StudentModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
StudentModel.belongsTo(UserModel, {foreignKey: 'userId'});

// Appointments relations
AppointmentModel.belongsTo(UserModel, {foreignKey: 'studentId', as: 'Student'});
AppointmentModel.belongsTo(UserModel, {foreignKey: 'tutorId', as: 'Tutor'});

AppointmentModel.hasOne(SessionModel, {foreignKey: 'appointmentId'});
SessionModel.belongsTo(AppointmentModel, {foreignKey: 'appointmentId', as: 'appointment'});

UserModel.hasMany(SessionModel, {as: 'StudentSessions', foreignKey: 'studentId'});
UserModel.hasMany(SessionModel, {as: 'TutorSessions', foreignKey: 'tutorId'});

SessionModel.belongsTo(UserModel, {foreignKey: 'studentId', as: 'student'});
SessionModel.belongsTo(UserModel, {foreignKey: 'tutorId', as: 'tutor'});

SessionModel.hasOne(ReviewModel, {foreignKey: 'sessionId'});
ReviewModel.belongsTo(SessionModel, {foreignKey: 'sessionId'});

UserModel.hasMany(ReviewModel, {as: 'StudentReviews', foreignKey: 'studentId'});
UserModel.hasMany(ReviewModel, {as: 'TutorReviews', foreignKey: 'tutorId'});

ReviewModel.belongsTo(UserModel, {foreignKey: "studentId", as: "student"});
ReviewModel.belongsTo(UserModel, {foreignKey: "tutorId", as: "tutor"});

SessionModel.hasOne(InvoiceModel, {foreignKey: 'sessionId'});
InvoiceModel.belongsTo(SessionModel, {foreignKey: 'sessionId'});

UserModel.hasMany(InvoiceModel, {as: 'StudentInvoices', foreignKey: 'studentId'});
UserModel.hasMany(InvoiceModel, {as: 'TutorInvoices', foreignKey: 'tutorId'});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel
db.student = StudentModel
db.tutor = TutorModel
db.session = SessionModel
db.invoice = InvoiceModel
db.review = ReviewModel
db.subject = SubjectModel
db.appointment = AppointmentModel

export default db;

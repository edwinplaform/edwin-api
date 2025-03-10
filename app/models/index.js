import {Sequelize} from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModelFunc from "./user.model.js"
import StudentModelFunc from "./student.model.js";
import TutorModelFunc from "./tutor.model.js";
import SessionModelFunc from "./session.model.js";
import InvoiceModelFunc from "./invoice.model.js";
import MessageModelFunc from "./message.model.js";
import ResourceModelFunc from "./resource.model.js";
import PaymentModelFunc from "./payment.model.js";
import ReviewModelFunc from "./review.model.js";
import TutorAvailabilityModelFunc from "./tutorAvailability.model.js";
import TutorSubjectModelFunc from "./tutorSubject.model.js";
import SubjectModelFunc from "./subject.model.js";
import NotificationModelFunc from "./notification.model.js";
import AppointmentModelFunc from "./appointment.model.js";


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
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
const MessageModel = MessageModelFunc(sequelize);
const ResourceModel = ResourceModelFunc(sequelize);
const PaymentModel = PaymentModelFunc(sequelize);
const ReviewModel = ReviewModelFunc(sequelize);
const TutorAvailabilityModel = TutorAvailabilityModelFunc(sequelize);
const TutorSubjectModel = TutorSubjectModelFunc(sequelize);
const SubjectModel = SubjectModelFunc(sequelize);
const NotificationModel = NotificationModelFunc(sequelize);
const AppointmentModel = AppointmentModelFunc(sequelize);

//-------------------------------------------------------------------------------------------
// User to Tutor and Student 1 to 1
UserModel.hasOne(TutorModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
TutorModel.belongsTo(UserModel, {foreignKey: 'userId'});

UserModel.hasOne(StudentModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
StudentModel.belongsTo(UserModel, {foreignKey: 'userId'});
//----------------------------------------------------------------------------------------------
// Tutor to TutorAvailability 1 to many
TutorModel.hasMany(TutorAvailabilityModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
TutorAvailabilityModel.belongsTo(TutorModel, {foreignKey: 'userId'});

// Messages between Users many to many
UserModel.hasMany(MessageModel, {as: 'SentMessages', foreignKey: 'sender_id', onDelete: 'CASCADE'});
UserModel.hasMany(MessageModel, {as: 'ReceivedMessages', foreignKey: 'receiver_id', onDelete: 'CASCADE'});
MessageModel.belongsTo(UserModel, {as: 'Sender', foreignKey: 'sender_id'});
MessageModel.belongsTo(UserModel, {as: 'Receiver', foreignKey: 'receiver_id'});

// Session between Student and Tutor many to many
// StudentModel.belongsToMany(TutorModel, {through: SessionModel, foreignKey: 'userId'});
// TutorModel.belongsToMany(StudentModel, {through: SessionModel, foreignKey: 'userId'});

// Tutor to Resources 1 to many
TutorModel.hasMany(ResourceModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
ResourceModel.belongsTo(TutorModel, {foreignKey: 'userId'});

// Payments between Student and Tutor many to many
StudentModel.belongsToMany(TutorModel, {through: PaymentModel, foreignKey: 'userId'});
TutorModel.belongsToMany(StudentModel, {through: PaymentModel, foreignKey: 'userId'});

// Tutor to Invoice 1 to many
// TutorModel.hasMany(InvoiceModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
// InvoiceModel.belongsTo(TutorModel, {foreignKey: 'userId'});

// Payment to Invoice 1 to 1
// PaymentModel.hasOne(InvoiceModel, {foreignKey: 'payment_id', onDelete: 'CASCADE'});
// InvoiceModel.belongsTo(PaymentModel, {foreignKey: 'payment_id'});

// Tutor and Subject many to many
TutorModel.belongsToMany(StudentModel, {through: TutorSubjectModel, foreignKey: 'userId'});
SubjectModel.belongsToMany(TutorModel, {through: TutorSubjectModel, foreignKey: 'subject_id'});

// Review to Student and Tutor 1 to many
// StudentModel.hasMany(ReviewModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
// ReviewModel.belongsTo(StudentModel, {foreignKey: 'userId'});
//
// TutorModel.hasMany(ReviewModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
// ReviewModel.belongsTo(TutorModel, {foreignKey: 'userId'});

UserModel.hasMany(NotificationModel, {foreignKey: 'recipient_id'});
NotificationModel.belongsTo(UserModel, {foreignKey: 'recipient_id'});

// --------------------------------------------------------------------------------------------
// Appointments relations
AppointmentModel.belongsTo(UserModel, {foreignKey: 'studentId', as: 'Student'});
// StudentModel.hasMany(AppointmentModel, {foreignKey: 'userId', onDelete: 'CASCADE'});
AppointmentModel.belongsTo(UserModel, {foreignKey: 'tutorId', as: 'Tutor'});

AppointmentModel.hasOne(SessionModel, {foreignKey: 'appointmentId'});
SessionModel.belongsTo(AppointmentModel, {foreignKey: 'appointmentId'});

UserModel.hasMany(SessionModel, {as: 'StudentSessions', foreignKey: 'studentId'});
UserModel.hasMany(SessionModel, {as: 'TutorSessions', foreignKey: 'tutorId'});

SessionModel.hasOne(ReviewModel, {foreignKey: 'sessionId'});
ReviewModel.belongsTo(SessionModel, {foreignKey: 'sessionId'})

UserModel.hasMany(ReviewModel, {as: 'StudentReviews', foreignKey: 'studentId'});
UserModel.hasMany(ReviewModel, {as: 'TutorReviews', foreignKey: 'tutorId'});

SessionModel.hasOne(InvoiceModel, {foreignKey: 'sessionId'});
InvoiceModel.belongsTo(SessionModel, {foreignKey: 'sessionId'});

UserModel.hasMany(InvoiceModel, {as: 'StudentInvoices', foreignKey: 'studentId'});
UserModel.hasMany(InvoiceModel, {as: 'TutorInvoices', foreignKey: 'tutorId'});
// AppointmentModel.belongsTo(TutorModel, {foreignKey: 'userId'});
// TutorModel.hasMany(AppointmentModel, {foreignKey: 'userId', onDelete: 'CASCADE'});

// Appointments between student and tutor
// AppointmentModel.belongsTo(SubjectModel, {foreignKey: 'subject_id'});
// SubjectModel.hasMany(AppointmentModel, {foreignKey: 'subject_id'});

// Appointment to Session (one-to-one)
// AppointmentModel.hasOne(SessionModel, {foreignKey: 'appointment_id', onDelete: 'SET NULL'});
// SessionModel.belongsTo(AppointmentModel, {foreignKey: 'appointment_id'});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel
db.student = StudentModel
db.tutor = TutorModel
db.session = SessionModel
db.invoice = InvoiceModel
db.message = MessageModel
db.resource = ResourceModel
db.payment = PaymentModel
db.review = ReviewModel
db.tutorAvailability = TutorAvailabilityModel
db.tutorSubject = TutorSubjectModel
db.subject = SubjectModel
db.notification = NotificationModel
db.appointment = AppointmentModel

export default db;

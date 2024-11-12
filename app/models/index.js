import {Sequelize} from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModelFunc from "./user.model.js"
import StudentModelFunc from "./student.model.js";
import TutorModelFunc from "./tutor.model.js";
import AppointmentModelFunc from "./session.model.js";
import InvoiceModelFunc from "./invoice.model.js";
import MessageModelFunc from "./message.model.js";
import ResourceModelFunc from "./resource.model.js";
import PaymentModelFunc from "./payment.model.js";
import ReviewModelFunc from "./review.model.js";
import TutorAvailabilityModelFunc from "./tutorAvailability.model.js";
import TutorSubjectModelFunc from "./tutorSubject.model.js";
import SubjectModelFunc from "./subject.model.js";
import NotificationModelFunc from "./notification.model.js";


const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool,
});


sequelize.authenticate().then(()=> {
    console.log("Connected successfully");
}).catch((err) => {
    console.log("Error connecting to database!");
});

const UserModel = UserModelFunc(sequelize);
const TutorModel = TutorModelFunc(sequelize);
const StudentModel = StudentModelFunc(sequelize);
const AppointmentModel = AppointmentModelFunc(sequelize);
const InvoiceModel = InvoiceModelFunc(sequelize);
const MessageModel = MessageModelFunc(sequelize);
const ResourceModel = ResourceModelFunc(sequelize);
const PaymentModel = PaymentModelFunc(sequelize);
const ReviewModel = ReviewModelFunc(sequelize);
const TutorAvailabilityModel = TutorAvailabilityModelFunc(sequelize);
const TutorSubjectModel = TutorSubjectModelFunc(sequelize);
const SubjectModel = SubjectModelFunc(sequelize);
const NotificationModel = NotificationModelFunc(sequelize);

// User to Tutor and Student 1 to 1
UserModel.hasOne(TutorModel, {foreignKey: 'user_id', onDelete: 'CASCADE'});
TutorModel.belongsTo(UserModel, {foreignKey: 'user_id'});

UserModel.hasOne(StudentModel, {foreignKey: 'user_id', onDelete: 'CASCADE'});
StudentModel.belongsTo(UserModel, {foreignKey: 'user_id'});

// Tutor to TutorAvailability 1 to many
TutorModel.hasMany(TutorAvailabilityModel,{foreignKey: 'tutor_id', onDelete: 'CASCADE'});
TutorAvailabilityModel.belongsTo(TutorModel, {foreignKey: 'tutor_id'});

// Messages between Users many to many
UserModel.hasMany(MessageModel,{ as:'SentMessages', foreignKey: 'sender_id', onDelete: 'CASCADE' });
UserModel.hasMany(MessageModel, { as: 'ReceivedMessages', foreignKey: 'receiver_id', onDelete: 'CASCADE' });
MessageModel.belongsTo(UserModel, { as: 'Sender', foreignKey: 'sender_id' });
MessageModel.belongsTo(UserModel, { as: 'Receiver', foreignKey: 'receiver_id' });

// Appointments between Student and Tutor many to many
StudentModel.belongsToMany(TutorModel, {through: AppointmentModel, foreignKey: 'student_id'});
TutorModel.belongsToMany(StudentModel, {through: AppointmentModel, foreignKey: 'tutor_id'});

// Tutor to Resources 1 to many
TutorModel.hasMany(ResourceModel, {foreignKey: 'tutor_id', onDelete: 'CASCADE'});
ResourceModel.belongsTo(TutorModel,{foreignKey: 'tutor_id'});

// Payments between Student and Tutor many to many
StudentModel.belongsToMany(TutorModel, { through: PaymentModel, foreignKey: 'student_id' });
TutorModel.belongsToMany(StudentModel, {through: PaymentModel, foreignKey: 'tutor_id'});

// Tutor to Invoice 1 to many
TutorModel.hasMany(InvoiceModel, {foreignKey: 'tutor_id', onDelete: 'CASCADE'});
InvoiceModel.belongsTo(TutorModel, {foreignKey: 'tutor_id'});

// Payment to Invoice 1 to 1
PaymentModel.hasOne(InvoiceModel, {foreignKey: 'payment_id', onDelete: 'CASCADE'});
InvoiceModel.belongsTo(PaymentModel, {foreignKey: 'payment_id'});

// Tutor and Subject many to many
TutorModel.belongsToMany(StudentModel, {through: TutorSubjectModel, foreignKey: 'tutor_id'});
SubjectModel.belongsToMany(TutorModel, {through: TutorSubjectModel, foreignKey: 'subject_id'});

// Review to Student and Tutor 1 to many
StudentModel.hasMany(ReviewModel, {foreignKey: 'student_id', onDelete: 'CASCADE'});
ReviewModel.belongsTo(StudentModel, {foreignKey: 'student_id'});

TutorModel.hasMany(ReviewModel, {foreignKey: 'tutor_id', onDelete: 'CASCADE'});
ReviewModel.belongsTo(TutorModel, {foreignKey: 'tutor_id'});

UserModel.hasMany(NotificationModel, { foreignKey: 'recipient_id' });
NotificationModel.belongsTo(UserModel, { foreignKey: 'recipient_id' });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel
db.student = StudentModel
db.tutor = TutorModel
db.appointment = AppointmentModel
db.invoice = InvoiceModel
db.message = MessageModel
db.resource = ResourceModel
db.payment = PaymentModel
db.review = ReviewModel
db.tutorAvailability = TutorAvailabilityModel
db.tutorSubject = TutorSubjectModel
db.subject = SubjectModel
db.notification = NotificationModel

export default db;

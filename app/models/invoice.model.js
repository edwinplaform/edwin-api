import { DataTypes } from "sequelize";

export default (sequelize) => {
    const InvoiceModel = sequelize.define("Invoice", {
        invoiceId: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique:true,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Sessions',
                key: 'id'
            }
        },
        tutorId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sessionDuration: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        paymentReceiptUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'PAID', 'OVERDUE'),
            defaultValue: 'PENDING'
        }
    }, {timestamps: true});

    return InvoiceModel;

};
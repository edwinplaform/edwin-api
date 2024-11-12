import {DataTypes} from "sequelize";

export default (sequelize) => {
    const PaymentModel = sequelize.define("Payment", {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'),
            defaultValue: 'PENDING'
        },
        payment_method: {
            type: DataTypes.ENUM('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER')
        },
        transaction_id: {
            type: DataTypes.STRING,
            unique: true
        },
        payment_gateway_response: {
            type: DataTypes.JSON
        },
    }, {timestamps: true});

    return PaymentModel;

};
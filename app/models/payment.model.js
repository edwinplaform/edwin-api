import { DataTypes } from "sequelize";

export default (sequelize) => {
    const PaymentModel = sequelize.define("Payment", {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.ENUM('stripe','slip'),
            allowNull: false,
        },
        payment_slip: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('pending','confirmed'),
            defaultValue: 'pending',
        },
    },{timestamps: true});

    return PaymentModel;

};
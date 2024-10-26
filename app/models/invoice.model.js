import { DataTypes } from "sequelize";

export default (sequelize) => {
    const InvoiceModel = sequelize.define("invoice", {
        invoice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        issue_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
        },
    }, {timestamps: true});

    return InvoiceModel;

};
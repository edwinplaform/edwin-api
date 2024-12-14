import db from "../models/index.js";
import http from "http-status-codes";

export const createInvoice = async (req, res) => {
    try {
        const {
            sessionId,
            tutorId,
            studentId,
            subject,
            sessionDuration,
            totalAmount
        } = req.body;

        const invoice = await db.invoice.create({
            invoiceId: `INV_${Date.now()}`,
            sessionId,
            tutorId,
            studentId,
            subject,
            sessionDuration,
            totalAmount,
            status: 'PENDING'
        });

        res.status(http.CREATED).json(invoice);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const updateInvoicePayment = async (req, res) => {
    try {
        const {invoiceId} = req.params;
        const {paymentReceiptUrl} = req.body;

        const invoice = await db.invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(http.NOT_FOUND).json({error: 'invoice not found'});
        }

        const updatedInvoice = await invoice.update({
            paymentReceiptUrl,
            status: 'PAID'
        });

        res.status(http.OK).json(updatedInvoice);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const getStudentInvoice = async (req, res) => {
    try {
        const {studentId} = req.params;
        const invoice = await db.invoice.findAll({
            where: {studentId},
            include: [
                {
                    model: db.session,
                    attributes: ['subject', 'startTime', 'endTime'],
                }
            ]
        });

        res.json(invoice);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

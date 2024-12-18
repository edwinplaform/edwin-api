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
        const {status, rejectReason, paymentReceiptUrl} = req.body;

        const validStatuses = ['PENDING', 'PAID', 'OVERDUE', 'APPROVED', 'REJECTED'];
        const invoice = await db.invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(http.NOT_FOUND).json({error: 'invoice not found'});
        }

        if (status) {
            if (!validStatuses.includes(status)) {
                return res.status(http.BAD_REQUEST).json({message: 'Invalid status'});
            }

            invoice.status = status;

            if (status === 'REJECTED' && rejectReason) {
                invoice.rejectReason = rejectReason;
            }
        }

        if (paymentReceiptUrl && status === 'PAID') {
            invoice.paymentReceiptUrl = paymentReceiptUrl;
        }

        await invoice.save();

        res.status(http.OK).json({message: 'Invoice updated successfully!', invoice});
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({message: 'Error updating invoice', error: err.message});
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
                    include: [
                        {
                            model: db.user,
                            as: 'tutor',
                            attributes: ['firstName', 'lastName'],
                            include: [
                                {
                                    model: db.tutor,
                                    attributes: ['bankDetails']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(http.OK).json(invoice);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const getStudentPayments = async (req, res) => {
    try {
        const {tutorId} = req.params;
        const payments = await db.invoice.findAll({
            where: {tutorId},
            include: [
                {
                    model: db.session,
                    attributes: ['subject', 'startTime', 'endTime'],
                    include: [
                        {
                            model: db.user,
                            as: 'student',
                            attributes: ['firstName', 'lastName'],
                        }
                    ]
                }
            ]
        });

        if (payments.length === 0) {
            return res.status(http.NOT_FOUND).json({message: 'No payments found for this tutor.'});
        }

        res.status(http.OK).json(payments);
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).json({error: err.message});
    }
};

export const updateStatus = async (req, res) => {
    try {
        const {invoiceId} = req.params;
        const {status, rejectReason} = req.body;

        const validStatuses = ['PENDING', 'PAID', 'OVERDUE', 'APPROVED', 'REJECTED'];
        if (!validStatuses.includes(status)) {
            return res.status(http.BAD_REQUEST).json({message: 'Invalid status'});
        }

        const payment = await db.appointment.findByPk(invoiceId);
        if (!payment) {
            return res.status(http.NOT_FOUND).json({message: 'payment not found'});
        }

        payment.status = status;
        if (status === 'REJECTED' && rejectReason) {
            payment.rejectReason = rejectReason;
        }

        await payment.save();

        res.status(http.OK).json({message: 'payment status updated successfully!', payment});
    } catch (error) {
        res.status(http.INTERNAL_SERVER_ERROR).json({
            message: 'Error updating payment status',
            error: error.message
        });
    }
};

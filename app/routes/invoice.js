import express from "express";
import {
    createInvoice,
    updateInvoicePayment,
    getStudentInvoice, getStudentPayments
} from "../controllers/invoice.controller.js";
import {updateStatus} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post('/invoices', createInvoice);
router.patch('/invoices/:invoiceId/payment', updateInvoicePayment);
router.get('/students/:studentId/invoices', getStudentInvoice);
router.get('/tutors/:tutorId/payments', getStudentPayments);
router.patch('/payments/:invoiceId/status', updateStatus);

export default router;
import express from "express";
import {
    createInvoice,
    updateInvoicePayment,
    getStudentInvoice
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post('/invoices', createInvoice);
router.patch('/invoices/:invoiceId/payment', updateInvoicePayment);
router.get('/students/:studentId/invoices', getStudentInvoice);

export default router;
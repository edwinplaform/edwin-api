import dotenv from "dotenv";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from 'fs';
import path from "path";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendEmail = async (to, subject, templateName, context) => {
    try {
        const templatePath = path.resolve(`./emailStructures/${templateName}.html`);
        const source = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(source);
        const html = template(context);

        const mailOptions = {
            from: process.env.GMAIL,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email : ', error);
    }
};

export { sendEmail };
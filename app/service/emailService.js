import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
});

const getEmailTemplate = (templateType, data) => {
    switch (templateType) {
        case "OTP":
            return {
                subject: "Your EDWin Verification Code",
                html: `

                    <h1>EDWin Email Verification</h1>
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) for verification is: <strong>${data.otp}</strong></p>
                    <p>This code will expire in 10 minutes.</p>
                    <p>Thank you, <br/>EDWin Team</p>
                `
            };
        case "BOOKING_CONFIRMATION":
            return {
                subject: "Session Booking Confirmation",
                html: `

                    <h1>Booking Confirmed!</h1>
                    <p>Hello ${data.studentName},</p>
                    <p>Your session with ${data.tutorName} has been confirmed.</p>
                    <p><strong>Date:</strong> ${data.date} <br/>
                    <strong>Time:</strong> ${data.time}</p>
                    <p>Thank you, <br/>EDWin Team</p>
        `,
            };
        case "TUTOR_ACCOUNT_APPROVAL":
            return {
                subject: "Tutor Account Verification",
                html: `

                    <h1>Your Tutor Account is Verified</h1>
                    <p>Hello ${data.name},</p>
                    <p>We are happy to inform you that your tutor account has been verified and approved.</p>
                    <p>You can now start teaching on EDWin.</p>
                    <p>Thank you, <br/>EDWin Team</p>
        `,
            };
        case "ZOOM_LINK":
            return {
                subject: "Your Zoom Session Link",
                html: `
                    <h1>Zoom Session Details</h1>
                    <p>Hello ${data.studentName},</p>
                    <p>Your Zoom session with ${data.tutorName} is scheduled.</p>
                    <p><strong>Date:</strong> ${data.date} <br/>
                    <strong>Time:</strong> ${data.time}</p>
                    <p><a href="${data.zoomLink}" target="_blank">Join Zoom Meeting</a></p>
                    <p>Thank you, <br/>EDWin Team</p>
        `,
            };
        default:
            return {
                subject: "EDWin Notification",
                html: `<p>Hello,</p><p>${data.message}</p><p>Thank you, <br/>EDWin Team</p>`,
            };
    }
};

export const sendEmail = async (email, templateType, data) => {
    const {subject, html} = getEmailTemplate(templateType, data);

    const mailOptions = {
        from: `"EDWin" <${process.env.GMAIL}>`,
        to: email,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email send successfully to ${email}`);
    } catch (err) {
        console.error("Error sending email: ", err);
    }
};


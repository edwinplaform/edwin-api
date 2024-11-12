import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

let mailOptions = {
    from: '"EDWin" bhn62812@gmail.com',
    to: "",
    subject:"HI",
    text:"HI",
    html: '<h1>HI</h1>'
};

transporter.sendMail(mailOptions, (error,info)=>{
    if (error) {
        return console.log('-------mail send error: '+ error.message);
    }
    console.log('Message sent: ' + info.messageId);
})
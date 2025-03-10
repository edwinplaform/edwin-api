const nodemailer = require('nodemailer');

exports.sendContactEmail = (req, res) => {
  const { name, email, message } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD 
    },
  });

  const mailOptions = {
    from: email, 
    to: 'edwinedu@gmail.com', 
    subject: 'New Contact Form Submission', 
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email'); 
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent!'); 
    }
  });
};
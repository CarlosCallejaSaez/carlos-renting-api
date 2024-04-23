const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.es', 
    port: 587, 
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

const sendNewsletter = (email, subject, content) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Newsletter sent: ' + info.response);
        }
    });
};

module.exports = { sendNewsletter };

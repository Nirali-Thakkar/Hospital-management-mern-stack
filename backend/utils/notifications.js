// const nodemailer = require("nodemailer");
// const twilio = require("twilio");

import nodemailer from "nodemailer"
// import {config} from "dotenv";
// import twilio from "twilio"
// config();
// Configure nodemailer
import { config } from "dotenv";

// Load environment variables
config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your SMTP user
    pass: process.env.SMTP_PASS, // your SMTP password
    authMethod: 'PLAIN'
  },
});


// Configure Twilio
// export const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

 export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// export const sendTextMessage = (to, message) => {
//   twilioClient.messages.create({
//     body: message,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to,
//   })
//   .then(message => console.log("Text message sent:", message.sid))
//   .catch(error => console.log("Error sending text message:", error));
// };

// module.exports = { sendEmail, sendTextMessage };

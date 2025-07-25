const nodemailer = require('nodemailer');

// For development: use Ethereal (change to real SMTP for production)
async function createTransporter() {
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

async function sendOTPEmail(to, otp) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: 'no-reply@smartcart.com',
    to,
    subject: 'Your Smart Cart OTP',
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <b>${otp}</b></p>`
  });
  console.log('OTP email sent:', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendOTPEmail }; 
const nodemailer = require("nodemailer");

// nodemailer setup gmail

exports.verification = async (
  userEmail,
  token // how come??
) => {
  let transporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PSW,
    },
  });

  const mailOptions = {
    from: {
      name: "Happy Stay",
      address: "verify@happystay.com",
    },
    to: userEmail,
    subject: "Verify Your Email",
    html:
      "<p>Hello, verify your account by clicking the link:</p>" +
      eval(
        `<a href='${process.env.CLIENT_URL}/verify/${token}' target="_blank">${process.env.CLIENT_URL}/verify/${token}</a>`
      ),
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      return console.log("Email sent!");
    })
    .catch((err) => {
      return console.log(err.message);
    });
};

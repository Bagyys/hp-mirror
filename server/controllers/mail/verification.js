const nodemailer = require("nodemailer");

// nodemailer setup gmail

exports.verification = async (userEmail, token) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
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
    // html:
    //   "<p>Hello, verify your account by clicking the link:</p>" +
    //   eval(
    //     `"<a href='${process.env.CLIENT_URL}/verify/${token}' target="_blank">${process.env.CLIENT_URL}/verify/${token}</a>"`
    //   ),
    html:
      "<p>Hello, verify your account by clicking the link:</p>" +
      "<a href=" +
      process.env.CLIENT_URL +
      "/verify/" +
      token +
      " target='_blank'>" +
      "click on this link to verify your email" +
      // process.env.CLIENT_URL +
      // "/verify/" +
      // token +
      "</a>",
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

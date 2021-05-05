const nodemailer = require("nodemailer");

// nodemailer setup gmail

module.exportssendEmail = async (
  userEmail,
  token // how come??
) => {
  let transporter = nodemailer.createTransport({
    host: "skorpionas.serveriai.lt",
    port: 465,
    auth: {
      user: "info@spareex.lt",
      pass: "Sparexinfo9358",
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

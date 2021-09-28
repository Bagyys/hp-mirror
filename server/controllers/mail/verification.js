const nodemailer = require("nodemailer");
const {google}= require("googleapis");



// nodemailer setup gmail

const oAuth2Client=new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

exports.verification = async (userEmail, token) => {
const accessToken = await oAuth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.VERIFY_GMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
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
      "<a href=" +
      process.env.CLIENT_URL +
      "/verify/" +
      token +
      " target='_blank'>" +
      "click on this link to verify your email" +
      "</a>",
  };

  transporter
    .sendMail(mailOptions)
    .catch((err) => {
      return console.log(err.message);
    });
};

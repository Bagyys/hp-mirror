const nodemailer = require("nodemailer");
const moment = require("moment-timezone");

const { Reservation } = require("../../models/reservationModel");
const { Property } = require("../../models/propertyModel");

exports.newReservation = async (userEmail, reservationId) => {
  let reservation;
  let property;
  try {
    reservation = await Reservation.findById(reservationId);
  } catch (error) {
    return console.log(error.message);
  }

  if (reservation) {
    try {
      property = await Property.findById(reservation.propertyId);
    } catch (error) {
      return console.log(error.message);
    }
  }

  // nodemailer setup gmail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PSW,
    },
  });

  if (reservation && property) {
    const startMoment = moment.tz(reservation.startDate, reservation.timeZone);
    const start = moment(startMoment).format("YYYY-MM-DD HH:mm");
    const endMoment = moment.tz(reservation.endDate, reservation.timeZone);
    const end = moment(endMoment).format("YYYY-MM-DD HH:mm");

    const mailOptions = {
      from: {
        name: "Happy Stay",
        address: "sales@happystay.com",
      },
      to: userEmail,
      subject: "New Reservation",
      html: `<p>Hello, Your new reservation:</p>
      <h3>Reservation at: ${property.title}</h3>
      <p>
        Address: ${property.location.addressString1} ${property.location.addressString2}
      </p>
      <p>
        City: ${property.location.city}
      </p>
      <p>
        Country: ${property.location.country}
      </p>
      <p>
        Start: ${start} | End: ${end} (time: ${reservation.timeZone})
      </p>`,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        return console.log("Email sent!");
      })
      .catch((err) => {
        return console.log(err.message);
      });
  }
};

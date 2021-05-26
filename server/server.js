const express = require("express");
const { socketConnection } = require("./utils/socket");
const updateReservations = require("./controllers/reservation/updateReservations");
const app = express();
const fs = require("fs");
const path = require("path");
require("dotenv").config();
require("./db/connection")();
const morgan = require("morgan");
const cors = require("cors");
morgan("tiny");
const helmet = require("helmet");
const cron = require("node-cron");
app.use(helmet());

// setup static files and bodyparser
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
// extended false leidzia parse'inti non default features
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

// Routes
const allUsers = require("./routes/userRoutes");
const allDoors = require("./routes/lockRoutes");
const allFlats = require("./routes/flatRoutes");
const allProperties = require("./routes/propertyRoutes");
const allReservations = require("./routes/reservationRoutes");

app.use("/door/", allDoors);
app.use("/flat/", allFlats);
app.use("/property/", allProperties);
app.use("/reservation/", allReservations);
app.use("/", allUsers);

// cron jobs
cron.schedule("59 23 * * *", () => {
  // move active reservations to past reservations after they've ended
  updateReservations();
});

const expressServer = app.listen(9000);
socketConnection.io.attach(expressServer);

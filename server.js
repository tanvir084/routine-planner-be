const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { addHeader } = require("./app/middlewares");
const db = require("./app/models");
const passport = require("passport");
const app = express();
const mongoURI = process.env.MONGODB_URI;

const { applyPassportStrategy } = require("./app/middlewares/passport");

const {
  authRouter,
  scheduleRouter,
  studyPlanRouter,
  generatedPlanner,
} = require("./app/routes");

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

applyPassportStrategy(passport);

const dbConnect = async (db) => {
  const url = mongoURI;
  console.log(url);
  try {
    await db.mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Connected");
  } catch (err) {
    console.error("Error at dbConnect ::", err);
    process.exit(1);
  }
};

dbConnect(db).catch((error) => console.error(error));

app.use(function (req, res, next) {
  addHeader;
  next();
});

app.use(authRouter);
app.use(scheduleRouter);
app.use(studyPlanRouter);
app.use(generatedPlanner);

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = {
  app,
  server,
};

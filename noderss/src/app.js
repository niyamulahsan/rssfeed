const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");

// route handler
const routes = require("./routes/index");

// swagger setup
const { swaggerServe, swaggerSetup } = require("./provider/swaggerSetup");

// error handler
const { notFoundHandler, defaultErrorHandler } = require("./middleware/errorHandler");

// cron job
require("./jobs/cron");

// app initialize with express
const app = express();
// request handler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// track request into console
app.use(morgan('dev'));
// cors setup
app.use(cors({ credentials: true, origin: "*" }));
// swagger setup must before router setup
app.use("/api-docs", swaggerServe, swaggerSetup);

// router setup
app.use("/api", routes);

// // home route for testing
// app.use("/", (req, res) => {
//   res.send("It's wrok...");
// });

// frontend technology linkup
const clientbuild = path.join(__dirname, '../../clientrss', 'dist');
app.use(express.static(clientbuild));
app.get('*', async (req, res) => {
  res.sendFile(path.join(clientbuild, 'index.html'));
});

// error handler
app.use(notFoundHandler);
app.use(defaultErrorHandler);

// run server
app.listen(process.env.PORT, () => {
  db.sequelize.authenticate().then(() => {
    console.log("Sequelize is running");
  });
  console.log(
    `Server is running with ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
  );
});

module.exports = app;
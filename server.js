const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB, (conn) => {
  console.log("DB connection established");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8080;

// http://localhost:8080/
app.listen(port, function () {
  console.log("App listening on port " + port);
});

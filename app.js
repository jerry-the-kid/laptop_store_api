const express = require("express");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");
const computerRouter = require("./routes/computerRouter");
const orderRouter = require("./routes/orderRouter");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/computers", computerRouter);
app.use("/api/v1/orders", orderRouter);

module.exports = app;

const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("../backend/middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();

const app = express();

//Middlewares for getting the body data on Post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Goal Routes
app.use("/api/goals", require("./routes/goalRoutes"));
//User Routes
app.use("/api/users", require("./routes/userRoutes"));

//Overwriting the default Express error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on PORT: ${port}`));

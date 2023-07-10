require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

const connectDB = require("./db/connect");

//routes
app.get("/api/v1/test", (req, res) => {
  res.send("the first route running");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    //connectDB
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is running at port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

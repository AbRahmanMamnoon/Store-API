const express = require("express");
const productsRout = require("./routs/productRouts");
const connectDB = require("./db/connection");
const notfound = require("./middleware/not-found");
const errHandlerMiddleware = require("./middleware/err-handler");
require('express-async-error');
const app = express();
require('dotenv').config();

// Middleware

app.use(express.json());

app.use("/api/v1/products", productsRout);

/// Not Found
app.use(notfound);
// Error Handler
app.use(errHandlerMiddleware);

const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

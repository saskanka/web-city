// npm run devStart on 3000 first
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on ${port}`));

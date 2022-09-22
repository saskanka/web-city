// npm run devStart on 3000 first
const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "world",
});

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/city", (req, res) => {
  const queryString = "SELECT * FROM city";
  connection.query(queryString, (err, rows, fields) => {
    console.log("*** get query started");
    if (err) {
      console.log("*** err", err);
      return res.json({ errorCode: err.errno, message: err.sqlMessage });
    }
    res.json(rows);
  });
});

app.get("/city/:id", (req, res) => {
  const id = req.params.id;
  const queryString = "SELECT * FROM city WHERE id = ?";
  connection.query(queryString, [id], (err, rows, fields) => {
    console.log("*** get Id query started with ID =", id);
    if (err) {
      console.log("*** err", err);
      return res.json({ errorCode: err.errno, message: err.sqlMessage });
    }
    res.json(rows);
  });
});

app.post("/city", (req, res) => {
  const { Name, CountryCode, District, Population } = req.body;
  const queryString =
    "INSERT INTO city (Name, CountryCode, District, Population) VALUES(?,?,?,?)";

  connection.query(
    queryString,
    [Name, CountryCode, District, Population],
    (err, rows, fields) => {
      console.log("*** insert query started");
      if (err) {
        console.log("*** err", err);
        return res.json({ errorCode: err.errno, message: err.sqlMessage });
      }
      res.json(rows);
    }
  );
});

app.delete("/city/:id", (req, res) => {
  const id = req.params.id;
  const queryString = "DELETE FROM city WHERE id = ?";
  connection.query(queryString, [id], (err, rows, fields) => {
    console.log("*** delete Id query started with ID =", id);
    if (err) {
      console.log("*** err", err);
      return res.json({ errorCode: err.errno, message: err.sqlMessage });
    }
    res.json(rows);
  });
});

const port = "8080"; // process.env.PORT;
app.listen(port, () => console.log(`Server started on ${port}`));

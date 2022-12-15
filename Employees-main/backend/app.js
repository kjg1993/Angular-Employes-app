const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const employeesRoutes = require("./routes/employees");

const app = express();

mongoose
mongoose.connect("mongodb+srv://alirio:LU2BYOQH3Es224in@cluster0.8egrifu.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/employees", employeesRoutes);

module.exports = app;

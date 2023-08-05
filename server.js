const express = require("express");
const mongoose = require("mongoose");
const app = require("./App");

const username = "Excel";
const password = "Excel_123";
const database_name = "Excel";
const db = `mongodb://${username}:${password}@ac-j3im6lj-shard-00-00.bpsc6bg.mongodb.net:27017,ac-j3im6lj-shard-00-01.bpsc6bg.mongodb.net:27017,ac-j3im6lj-shard-00-02.bpsc6bg.mongodb.net:27017/${database_name}?ssl=true&replicaSet=atlas-ymw7xh-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(db)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(3000, () => {
  console.log("Connected");
});

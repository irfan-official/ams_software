import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnection from "./db/connection/mongodb.connection.js"
const app = express();

app.listen(process.env.PORT || 4000, () => {
  dbConnection();
  console.log(`App started at http://localhost:${process.env.PORT || 4000}`);
});

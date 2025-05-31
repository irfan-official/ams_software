import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import dbConnection from "./connection/mongodb.connection.js"
import authRoute from "./routes/authentication.routes.js"
import {Internal, External} from "./utils/ErrorTypesCode.js"

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const port = Number(process.env.PORT) || 4000

app.listen(port, () => {
  dbConnection();
  console.log(`App started at http://localhost:${process.env.PORT || 4000}`);
});


app.use("/auth/api/v1", authRoute)


app.use((error, req, res, next) => {
  if(error.ErrorTypes = Internal){
    return res.status(error.statusCode).json(
      {
        redirect: false,
        success: false,
        message: error.message
      }
    )
  }else{
    return res.status(error.statusCode).json({
        redirect: true,
        success: false,
        message: error.message
    })
  }
})
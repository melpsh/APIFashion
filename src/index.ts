import express from "express";
import cors from "cors";
import { usersControllers } from "./users";
import mongoose from "mongoose";
import { authControllers } from "./auth";
import { productsControllers } from "./products";
import { errorHandelingMid } from "./middlewares";
import { contactControllers } from "./contact";
// express app
const app = express();
// for read .env files
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// routes
// app.use('/contact',contactControllers)
app.use("/auth", authControllers);
app.use("/products", productsControllers);

// app.use(errorHandelingMid)

// server start
mongoose
  .connect("mongodb://127.0.0.1:27017/test_app")
  .then(() => {
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });

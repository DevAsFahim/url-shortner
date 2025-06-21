import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shortUrl.model.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";

dotenv.config("./.env");
const app = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", shortUrlRouter);

app.get('/:id', redirectFromShortUrl)

app.listen(5000, () => {
  connectDB();
  console.log("Server is listening on port http://localhost:5000");
});

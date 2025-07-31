import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shortUrl.model.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import authRouter from "./src/routes/auth.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config("./.env");
const app = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// check user
app.use(attachUser);

app.use("/api/auth", authRouter);
app.use("/api/create", shortUrlRouter);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(5000, () => {
  connectDB();
  console.log("Server is listening on port http://localhost:5000");
});

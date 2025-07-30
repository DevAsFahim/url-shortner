import express from "express";
import {
  createShortUrl,
  createCustomShortUrl,
} from "../controllers/shortUrl.controller.js";

const router = express.Router();

router.post("/", createShortUrl);
router.post("/", createCustomShortUrl);

export default router;

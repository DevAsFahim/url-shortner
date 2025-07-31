import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortURlWithoutUser,
  createShortURlWithUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortURlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortURlWithoutUser(data.url);
  }

  res.send(process.env.APP_URL + shortUrl);
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("Not Found!");
  }
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortURlWithoutUser(url, slug);

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

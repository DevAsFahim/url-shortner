import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortURlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short url not generated");
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortURlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);
  const exist = await getCustomShortUrl(slug);
  if (exist) throw new Error("This custom url already exists");

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};

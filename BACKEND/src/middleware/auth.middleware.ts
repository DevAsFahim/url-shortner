import { findUserById } from "../dao/user.dao";
import { verifyToken } from "../utils/helper";

export const auth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized!" });

  try {
    const decoded = verifyToken(token);

    const user = await findUserById(decoded.id);
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized!" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }
};

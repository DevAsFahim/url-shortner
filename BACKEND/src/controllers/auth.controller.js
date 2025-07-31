import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const {token, user} = await loginUser(email, password);

  req.user = user
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
  });
});

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Registered successfully?",
    token,
  });
});

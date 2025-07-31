import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError, NotFoundError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || password !== user.password) throw new  Error("Invalid credentials");

  const token = await signToken({
    id: user._id,
    name: user.name,
    email: user.email,
  });

  return {token, user};
};

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User is already exists!");

  const newUser = await createUser({ name, email, password });

  const token = await signToken({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });

  return {token, user};
};

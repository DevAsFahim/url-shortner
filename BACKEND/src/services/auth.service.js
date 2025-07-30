import User from "../models/user.model.js";

export const registerUser = async (name, email, password) => {
  const user = await User.find({ email: email });
  if (user) {
    throw Error("User is already exists!");
  }

   
  
};

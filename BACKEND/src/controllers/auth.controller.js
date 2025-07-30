import wrapAsync from "../utils/tryCatchWrapper.js";
import {registerUser} from "../services/auth.service.js"

export const login = wrapAsync(async(req, res) => {
    res.status(200).json("logged in")
})
export const register = wrapAsync(async(req, res) => {
    const {name, email, password} = req.body
    const user = await registerUser(name, email, password)
    res.status(200).json("registered")
})
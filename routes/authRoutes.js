import express from "express"
import { authentication, getController, loginController, protectedController, signupController } from "../controllers/authControllers.js"

const authRoutes  = express.Router()

authRoutes.get("/get", getController)
authRoutes.post("/signup", signupController)
authRoutes.post("/login", loginController)
authRoutes.get("/protected", authentication, protectedController)

export default authRoutes
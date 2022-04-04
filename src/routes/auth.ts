import { Router } from "express";
import AuthController from "../controllers/auth";

// AuthHandlers
const {signUpHandler} = new AuthController()
// auth router
const authRouter = Router()
// signUp Route
authRouter.post("/signup", signUpHandler);
// export the auth router
export default authRouter
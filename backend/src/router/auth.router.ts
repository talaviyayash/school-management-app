import { Router } from "express";
import {
  forgetPassword,
  logOut,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.controller";
import { validateRequest } from "../utils/validateRequest";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validations/user.validation";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);
authRouter.post("/signin", validateRequest(signInSchema), signIn);
authRouter.post(
  "/forget-password",
  validateRequest(forgetPasswordSchema),
  forgetPassword
);

authRouter.put(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  resetPassword
);
authRouter.post("/logout", logOut);

export { authRouter };

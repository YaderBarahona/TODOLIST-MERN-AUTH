import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.Middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

//middleware authrequire antes de profile
router.get("/profile", authRequire, profile);

router.get("/verify", verifyToken);

export default router;

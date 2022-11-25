import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const router = Router();

router.post("/login", authController.singIn);
router.get("/permissions", authController.permissions);
export default router;
import { Router } from "express";
import { userlogin, userRegister } from "../controladores/user.controlador.js";
const router = Router()

router.post("/register", userRegister)
router.post("/login", userlogin)
export default router


import { Router } from "express";
import { userlogin, userRegister, updateUser } from "../controladores/user.controlador.js";
const router = Router()

router.post("/register", userRegister)
router.post("/login", userlogin)
router.put("/update/:id", updateUser)

export default router


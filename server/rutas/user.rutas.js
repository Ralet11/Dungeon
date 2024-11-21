import { Router } from "express";
import { userLogin, userRegister, updateUser } from "../controladores/user.controlador.js";
const router = Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/update/:id", updateUser)

export default router


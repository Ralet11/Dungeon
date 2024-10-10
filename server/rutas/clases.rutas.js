//copiar de user.rutas.js y modificar para clases
import { Router } from "express";
import {getClases} from "../controladores/clases.controlador.js"
const router = Router()

router.get("/dndClases", getClases)

export default router
// armar las rutas para traer todas las clases

//ruta get 

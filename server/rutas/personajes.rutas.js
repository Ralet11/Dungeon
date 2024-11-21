import { Router } from "express";
import { crearPj, get, getbyuser, modificar, eliminar} from "../controladores/pj.controlador.js";
const router = Router()

router.post("/crear_personaje", crearPj)
router.get("/get", get)
router.put("/modificar/:id" , modificar)
router.delete("/eliminar:id", eliminar) 
router.post("/personajes_encontrados", getbyuser)

export default router
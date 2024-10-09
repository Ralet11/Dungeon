import express from "express"
import userRouter from "./rutas/user.rutas.js"
import personajeRouter from "./rutas/personajes.rutas.js"
import morgan from "morgan";



const app = express()
app.use(morgan("dev"))
app.use(express.json({ limit: "10mb" }));
app.get("/", (req,res)=>{
    res.send("Petición aceptada")
    console.log("Petición aceptada en server")
})
app.use("/api/user", userRouter)
app.use("/api/personaje", personajeRouter)
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})



const dndClasses = [
    { id: 1, name: "Bárbaro" },
    { id: 2, name: "Bardo" },
    { id: 3, name: "Clérigo" },
    { id: 4, name: "Druida" },
    { id: 5, name: "Guerrero" },
    { id: 6, name: "Mago" },
    { id: 7, name: "Pícaro" },
    { id: 8, name: "Explorador" },
    { id: 9, name: "Paladín" },
    { id: 10, name: "Hechicero" },
    { id: 11, name: "Artificiero" },
    { id: 12, name: "Monje" },
    { id: 13, name: "Místico" },
    { id: 14, name: "Guerrero de la gloria" },
    { id: 15, name: "Sombra" }
]

export const getClases = (req , res)=>{
    res.send(dndClasses)
    }


// copiar de user.controlador.js

// armar el controlador get para traer todas las clase
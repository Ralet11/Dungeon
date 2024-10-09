const personajes = [{
    id: 1,
    nombre: "Thaldrin Puñoférreo",  // Nombre del personaje
    raza: "Enano",  // Raza
    clase: "Guerrero",  // Clase del personaje
    nivel: 5,  // Nivel del personaje
    puntosDeVida: 45,  // Puntos de vida
    alineamiento: "Legal Bueno",  // Alineamiento moral
    ca: 17,   // Clase de Armadura
    user_name: "Pablo"
  }]

  export const crearPj = (req, res) =>{
    const {id, nombre, raza, clase, nivel, puntosDeVida, alineamiento, ca, user_name}= req.body //extraer la info del body
    //guardar la info en personajes
    const nuevo_personaje = {
      id,
      nombre,
      raza,
      clase,
      nivel,
      puntosDeVida,
      alineamiento,
      ca,
      user_name,
    }
  console.log(nuevo_personaje)
personajes.push(nuevo_personaje)

// devolver la info
if (nuevo_personaje) {
  res.send("Personaje Creado");
} else {
  res.status(400).send("Error al crear PJ");
}
}

export const get = (req , res)=>{
res.send(personajes)
}

export const getbyuser =(req, res)=>{
  const {user_name} = req.body
  let personajes_encontrados = []
  personajes.map((personaje)=>{
    if (personaje.user_name === user_name){
      personajes_encontrados.push(personaje)
  }
  })
  if (personajes_encontrados.length > 0) {
    res.send(personajes_encontrados);
  } else {
    res.status(401).send("No tenes PJ creado");
  }
}
const usuarios = [{
    nombre: "Pablo",
    contraseña: 123456,
    id: 1,
    direccion,
    telefono,
}];

export const userlogin = (req, res) => {
    const { nombre, contraseña } = req.body;
    console.log(req.body)
    // Buscar el usuario que coincida con el nombre y la contraseña
    const usuarioValido = usuarios.find(user => user.nombre === nombre && user.contraseña === contraseña);

    if (usuarioValido) {
        res.send("Usuario conectado");
    } else {
        res.status(401).send("Credenciales incorrectas");
    }
}

export const userRegister = (req, res) =>{
    const {nombre, contraseña} = req.body;

    const usuarioEncontrado = usuarios.find(user => user.nombre === nombre);
    if (usuarioEncontrado) {
        res.status(400).send("Usuario ya existente :( ");
    } else {
        usuarios.push({nombre, contraseña})
        res.send({
            mensaje: "Usuario Creado",
            usuarios: usuarios
        });
    }
}

export const updateUser = (req, res) => {

    const { id } = req.params;
    const {nombre, contraseña, } = req.body;

 // encontrar el usuario cuyo id coincida con el id de la URL
   try {
    const usuario = usuarios.find(user => user.id == id);
    usuario.nombre = nombre
    usuario.contraseña = contraseña
    console.log(usuario, "nuevo usuario")
    console.log(usuarios, "lista de usuarios")
    res.send({usuarios, usuario})
   } catch (error) {
    console.log("usuario no encontrado")
    res.send(error)
   }

   
}
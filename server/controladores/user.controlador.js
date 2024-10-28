const usuarios = [{
    email: "ramiro.alet@hotmail.com",
    contraseña: "123456",
    id: 1,
    name: "ramiro alet",
    phone: "154658585",
    direccion: "direccion 1"
}];



export const userlogin = (req, res) => {
    const { email, contraseña } = req.body;
console.log(email, contraseña, "datos del usuario")
    // Buscar el usuario que coincida con el email y la contraseña
    const usuarioValido = usuarios.find(user => user.email === email && user.contraseña === contraseña);

    if (usuarioValido) {
        res.send({
            usuario: usuarioValido,
            mensaje: "Inicio de sesión exitoso"
        });
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
const usuarios = [{
    nombre: "Pablo",
    contraseña: 123456
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

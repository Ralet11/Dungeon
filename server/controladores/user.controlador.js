import User from "../modelos/user.js";

// Función para iniciar sesión
export const userLogin = async (req, res) => {
    const { email, contraseña } = req.body;
    console.log(email, contraseña, "datos del usuario");

    try {
        // Buscar el usuario que coincida con el email y la contraseña
        const usuarioValido = await User.findOne({
            where: {
                email: email,
                password: contraseña
            }
        });

        if (usuarioValido) {
            res.send({
                usuario: usuarioValido,
                mensaje: "Inicio de sesión exitoso"
            });
        } else {
            res.status(401).send("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Función para registrar un usuario
export const userRegister = async (req, res) => {
    const { name, password, address, email } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioEncontrado = await User.findOne({
            where: { email: email }
        });

        if (usuarioEncontrado) {
            res.status(400).send("Usuario ya existente :(");
        } else {
            // Crear el nuevo usuario
            await User.create({ name, password, address, email });

            // Obtener todos los usuarios para confirmar la creación
            const usuariosTotales = await User.findAll();
            res.send({
                mensaje: "Usuario creado",
                usuarios: usuariosTotales
            });
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Función para actualizar un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, address } = req.body;

    try {
        // Buscar el usuario por ID
        const usuario = await User.findByPk(id);

        if (usuario) {
            // Actualizar los campos necesarios
            usuario.name = name || usuario.name;
            usuario.password = password || usuario.password;
            usuario.address = address || usuario.address;

            await usuario.save(); // Guardar los cambios en la base de datos

            res.send({
                mensaje: "Usuario actualizado",
                usuario
            });
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const register = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	if (!email) return res.status(400).json({ msg: "El email es obligatorio" });
	if (!password)
		return res.status(400).json({ msg: "la contraseña es obligatoria" });

	// Verificar si el usuario ya existe en la base de datos
	let user = await User.findOne({ email });
	if (user) {
		return res
			.status(400)
			.json({ msg: "Este correo electronico ya se encuentra registrado" });
	}
	// Si no hay un usuario con ese email lo creamos y guardamos en la
	user = new User({
		firstname,
		lastname,
		email: email.toLowerCase(),
		role: "user",
		active: false,
	});

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);

	user.password = hashPassword;

	try {
		await user.save();
		return res.json({ msg: "Usuario creado correctamente" });
	} catch (error) {
		console.log(error);
		return res.json(error);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email) return res.status(400).json({ msg: "El email es requerido" });
	if (!password)
		return res.status(400).json({ msg: "El password es requerido" });

	const emailLowerCase = email.toLowerCase();

	const user = await User.findOne({ email: emailLowerCase });
	if (!user)
		return res.status(400).json({ msg: "El usuario no existe en la DB" });

	if (!bcrypt.compareSync(password, user.password))
		return res.status(400).json({ msg: "Error del servidor" });

	if (!user.active) return res.status(400).json({ msg: "Usuario Inactivo" });

	return res.status(200).json({
		access: jwt.createAccessToken(user),
		refresh: jwt.createRefreshToken(user),
	});
};

const refreshAccesToken = async (req, res) => {
	//Aqui va el codigo para validar y renovar el token de acceso
	const { token } = req.body;

	if (!token) {
		return res.status(400).send({ msg: "No hay token" });
	}

	const { user_id } = jwt.decode(token);

	const user = await User.findOne({ _id: user_id });
	if (!user) return res.status(500).send({ msg: "Error del servidor" });
	return res.status(200).json({
		accessToken: jwt.createAccessToken(user),
	});
};

module.exports = {
	register,
	login,
	refreshAccesToken,
};

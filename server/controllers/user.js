const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { getFilePath } = require("../utils/image");

const getMe = async (req, res) => {
	console.log(req.user);
	const { user_id } = req.user;
	const user = await User.findById({ _id: user_id });
	if (!user) {
		return res.status(401).json({ msg: "No se ha encontrado usuario" });
	}
	return res.status(200).json(user);
};

const getUsers = async (req, res) => {
	//TODO: Implementar la funcion para obtener todos los usuarios del sistema
	//Traigo todos los usuarios que tengo activos
	const { active } = req.query;
	let response = null;

	if (active === undefined) {
		response = await User.find();
	} else {
		response = await User.find({ active: true });
	}

	return res.status(200).send(response);
};

const createUser = async (req, res) => {
	// TODO: Crear un nuevo usuario en el sistema
	const { password, email } = req.body;

	const userExist = await User.findOne({ email });
	if (userExist) {
		return res
			.status(400)
			.json({ msg: "El usuario ya se encuentra registrado" });
	}

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	//Una alternativa para modificar password y active
	// const user = new User({...req.body, active: false, password: hashedPassword} )

	const user = new User(req.body);

	user.active = false;
	user.password = hashedPassword;

	if (req.files.avatar) {
		//Todo: falta procesar el avatar
		const imagePath = getFilePath(req.files.avatar);
		user.avatar = imagePath;
	}
	await user.save();

	return res.status(200).json(user);
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	//password
	if (userData.password) {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(userData.password, salt);
		userData.password = hashedPassword;
	} else {
		delete userData.password;
	}

	//Avatar
	if (req.files.avatar) {
		const imagePath = getFilePath(req.files.avatar);
		userData.avatar = imagePath;
	}

	const user = await User.findByIdAndUpdate({ _id: id }, userData);
	if (!user) {
		return res
			.status(400)
			.json({ msg: "El usuario que intenta actualizar no existe" });
	}

	return res
		.status(200)
		.json({ msg: "Usuario actualizado correctamente", user: userData });
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findByIdAndDelete({ _id:id })
	if (!user) {
		return res.status(400).json({msg: 'No existe el usuario'})
	}

	return res.status(200).json({msg: 'Usuario borrado correctamente'})
}

module.exports = {
	getMe,
	getUsers,
	createUser,
	updateUser,
	deleteUser
};

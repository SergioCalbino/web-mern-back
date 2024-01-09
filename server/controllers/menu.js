const Menu = require("../models/Menu");

const createMenu = async (req, res) => {
	const menu = await new Menu(req.body);

	try {
		menu.save();
		return res.status(200).send({ msg: "Menu creado correctamente", menu });
	} catch (error) {
		return res.status(400).send({ msg: "Error al crear menu" });
	}
};

const getMenu = async (req, res) => {
	const { active } = req.query;
	let response = null;

	if (!active) {
		response = await Menu.find().sort({ order: "asc" });
	} else {
		response = await Menu.find({ active }).sort({ order: "asc" });
	}

	if (!response) {
		return res.status(400).send({ msg: "No se ha encontrado el menu" });
	} else {
		return res.status(200).send(response);
	}
};

const updateMenu = async (req, res) => {
	const { id } = req.params;
	const menuData = req.body;
	try {
		const menu = await Menu.findByIdAndUpdate({ _id: id }, menuData);
        if (!menu) {
            return res.status(400).send({msg: 'El menu que desea actualizar no existe'})
        }
		return res
			.status(200)
			.send({ msg: "Menu modificado correctamente", menuData });
	} catch (error) {
		return res.status(400).send(error);
	}
};

const deleteMenu = async (req, res) => {
	const { id } = req.params;

	try {
		const menu = await Menu.findByIdAndDelete({ _id: id });
        if (!menu) {
            return res.status(400).send({msg: 'El menu que desea eliminar no existe'})
        }
		return res.status(200).send("Registro eliminado");
	} catch (error) {
		return res.status(400).send(error);
	}
};

module.exports = {
	createMenu,
	getMenu,
	updateMenu,
	deleteMenu,
};

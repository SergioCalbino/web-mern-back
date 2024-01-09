const jwt = require("../utils/jwt");

const asureAuth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({ msg: "No hay token en la peticion" });
	}
	const token = req.headers.authorization.replace("Bearer ", "");
	try {
		//Decodifico el payload de mi token
		const payload = jwt.decode(token);
		const { exp } = payload;
		const currentData = new Date().getTime();
		//Ahora compruebo si la fecha de expiracion esta vigente o no. Por eso obtengo el getTime actual para comprobar con la exp
		if (exp <= currentData) {
			return res.status(400).send({ msg: "El token ha expirado" });
		}
		req.user = payload;
		next();
	} catch (error) {
		return res.status(400).send({ msg: "Token invalido" });
	}
};

module.exports = {
	asureAuth,
};

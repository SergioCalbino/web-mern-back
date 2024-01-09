const Course = require("../models/Course");
const image = require("../utils/image");

const createCourse = async (req, res) => {
	const course = await new Course(req.body);

	const imagePath = image.getFilePath(req.files.miniature);
	course.miniature = imagePath;

	try {
		await course.save();
		return res
			.status(200)
			.json({ msg: "Curso creado de forma exitosa", course });
	} catch (error) {
		return res.status(400).json({ msg: "Error", error });
	}
};

const getCourse = async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const options = {
		page: parseInt(page),
		limit: parseInt(limit),
	};

	try {
		const courses = await Course.paginate({}, options);
		return res.status(200).json(courses);
	} catch (err) {
		return res
			.status(400)
			.send({ msg: "Error al obtener los cursos", error: err.message });
	}
};

const updateCourse = (req, res) => {
	const { id } = req.params;

	const courseData = req.body;

	if (req.files.miniature) {
		const imagePath = image.getFilePath(req.files.miniature);
		courseData.miniature = imagePath;
	}
	const course = Course.findByIdAndUpdate({ _id: id }, courseData);
	course
		.then((course) =>
			res.status(200).send({ msg: "Curoseo actualizado correctamente", courseData })
		)
		.catch((err) => res.status(400).send(err));
};

const deleteCourse = async (req, res) => {
    const { id } = req.params
    try {
        const course = await Course.findByIdAndDelete({ _id: id })
        if (!course) {
            return res.status(400).send({msg: "No se ha encontrado el curso que desea eliminar"})
            
        }
        return res.status(200).send({msg: "Curso eliminado de forma correcta"})
        
        
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = {
	createCourse,
	getCourse,
    updateCourse,
    deleteCourse
};

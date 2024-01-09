const getFilePath = (files) => {
	const filePath = files.path;
	const fileSplit = filePath.split("\\");
	return `${fileSplit[1]}/${fileSplit[2]}`;
};

module.exports = {
	getFilePath,
};

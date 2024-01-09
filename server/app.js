const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const api = require("./router/auth");

const app = express();

//Importo las rutas
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const menuRouter = require("./router/menu");
const courseRouter = require("./router/course");

//Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurar static folder
app.use(express.static("uploads"));

//Configurar CORS
app.use(cors());

//Configuro las rutas
app.use(`/api/${API_VERSION}`, authRouter);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, courseRouter);

module.exports = app;

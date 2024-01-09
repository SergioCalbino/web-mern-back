const express = require('express');
const { asureAuth } = require('../middlewares/authenticated');
const { createMenu, getMenu, updateMenu, deleteMenu } = require('../controllers/menu');

const api = express.Router();

//Endpoints
api.post('/menu', [asureAuth], createMenu);
api.get('/menu', [asureAuth], getMenu);
api.patch('/menu/:id', [asureAuth], updateMenu);
api.delete('/menu/:id', [asureAuth], deleteMenu);

module.exports = api;
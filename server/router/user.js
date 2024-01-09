const express = require('express');
const multiParty = require('connect-multiparty')
const { getMe, getUsers, createUser, updateUser, deleteUser } = require('../controllers/user');
const { asureAuth } = require('../middlewares/authenticated');

const api = express.Router();
const multiUpload = multiParty({uploadDir: './uploads/avatar'})

api.get('/user/me', [asureAuth], getMe);
api.get('/users', [asureAuth], getUsers);
api.post('/user', [asureAuth, multiUpload], createUser);
api.patch('/user/:id', [asureAuth, multiUpload], updateUser);
api.delete('/user/:id', [asureAuth, multiUpload], deleteUser);

module.exports = api;
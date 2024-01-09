const express = require('express');
const multiparty = require('connect-multiparty');
const { asureAuth } = require('../middlewares/authenticated');
const md_upload = multiparty({ uploadDir: './uploads/course' })
const { createCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/course');

const api = express.Router();

api.post('/course', [asureAuth, md_upload],  createCourse)
api.get('/course', [asureAuth, md_upload],  getCourse)
api.patch('/course/:id', [asureAuth, md_upload],  updateCourse)
api.delete('/course/:id', [asureAuth, md_upload],  deleteCourse)

module.exports = api
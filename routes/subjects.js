const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjects');


router.get('/', subjectsController.getSubjects);
router.get('/add', subjectsController.getAddSubject);
router.post('/add', subjectsController.postAddSubject);
// router.post('/add/:name', subjectsController.addSubject);


module.exports = router
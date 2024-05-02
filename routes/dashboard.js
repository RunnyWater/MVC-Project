const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/', dashboardController.getDashboard);
router.post('/add-mark', dashboardController.addMark);
router.delete('/delete-mark', dashboardController.deleteMark);
module.exports = router
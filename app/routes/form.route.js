const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controller');

router.post('/contact-us', formController.sendContactEmail); 

module.exports = router;
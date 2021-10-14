const express = require('express');
const router = express.Router();

const SampleController = require('./../controllers/sample.controllers');
// const checkAuth = require('../middleware/check-auth');

router.get('/', SampleController.sample);
// router.get('/Register', SampleController.sample);

module.exports = router;

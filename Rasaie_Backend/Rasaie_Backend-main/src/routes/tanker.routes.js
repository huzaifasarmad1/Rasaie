const express = require('express');
const router = express.Router();

const tankerController = require('./../controllers/tanker.controllers');
// const checkAuth = require('../middleware/check-auth');

router.get('/', tankerController.getTankers);

router.post('/', tankerController.addTanker);

router.put('/', tankerController.putTanker);
// router.get('/Register', SampleController.sample);

module.exports = router;

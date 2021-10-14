const express = require('express');
const router = express.Router();

const tankControllers = require('./../controllers/tank.controller');
// const checkAuth = require('../middleware/check-auth');


router.post('/', tankControllers.posttanklevel);
router.get('/', tankControllers.gettanklevel);
router.get('/sendStatus', tankControllers.sendStatus);
router.get('/:tankid', tankControllers.gettanklevelbyid);

// router.get('/Register', SampleController.sample);

module.exports = router;
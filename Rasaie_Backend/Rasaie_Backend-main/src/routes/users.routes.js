const express = require('express');
const router = express.Router();

// const SampleController = require('./../controllers/sample.controllers');
const UserController = require('./../controllers/users.controllers');
// const checkAuth = require('../middleware/check-auth');

// router.get("/",UserController.sampleUser);
router.get('/', UserController.getUsers);
router.post('/', UserController.addUser);
router.get('/id', UserController.getUsersByID);
router.get('/sendText', UserController.sendText);
router.post('/sendOrder', UserController.sendOrder);
router.get('/validate', UserController.validate);
router.put('/putUser', UserController.putUser);

// router.post("/login", UserController.user_login);

// router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;

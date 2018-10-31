/*
	Routes file - to declare all the api routes
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user.controller');


require('./../middleware/passport')(passport)

/* User Controller Routes */
router.post('/user', UserController.create);                                                    // C
router.get('/user', passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put('/user', passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete('/user', passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post('/login', UserController.login);

module.exports = router;
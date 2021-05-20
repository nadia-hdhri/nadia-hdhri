const express = require('express');
const route = express.Router();

const adminControllers = require('../controllers/Admin')

const {check} = require('express-validator')


route.post('/signup', 
check('name')
.not()
.isEmpty(),
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, adminControllers.signup)


route.post('/login',
check('password')
.isLength({min:8}),
check('email')
.normalizeEmail()
,adminControllers.login)



module.exports = route
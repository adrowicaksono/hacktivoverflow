const express = require('express')
const router = express.Router()
const ControllerAuth = require('../controllers/auth')
const { isUserActive } = require('../middleware/isUserActive')

router
    .post('/', ControllerAuth.login)
    .post('/facebook', ControllerAuth.loginFacebook)
    .post('/isActive', isUserActive)

module.exports = router
const express = require('express')
const router = express.Router()
const ControllerComments = require('../controllers/comments')

router.get('/', ControllerComments.get)
router.post('/', ControllerComments.add)
router.delete('/', ControllerComments.remove)
router.put('/', ControllerComments.edit)

module.exports = router
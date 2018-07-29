const express = require('express')
const router = express.Router()
const ControllerQuestions = require('../controllers/questions')

router.get('/', ControllerQuestions.get)
router.post('/', ControllerQuestions.add)
router.delete('/', ControllerQuestions.remove)
router.put('/', ControllerQuestions.edit)

module.exports = router
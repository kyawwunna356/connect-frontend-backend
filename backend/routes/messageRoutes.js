const express = require('express')
const { getMessage, sendMessage } = require('../controllers/message')
const router = express.Router()

//read
router.get('/:conversation_id', getMessage)


//post
router.post('/:conversation_id',sendMessage)


module.exports = router
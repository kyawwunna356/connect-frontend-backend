const express = require('express')
const { createConversation, getConversations, deleteConversation } = require('../controllers/conversation')
const router = express.Router()

//read
router.get('/:userId', getConversations)


//post
router.post('/',createConversation)


//delete
router.delete('/:converId',deleteConversation)


module.exports = router
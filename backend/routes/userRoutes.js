const express = require('express')
const { getUser, addRemoveFriends, getAllUsers } = require('../controllers/user')
const { tokenCheck } = require('../middlewares/auth')
const router = express.Router()

router.use(tokenCheck)

router.get('/:id',getUser)
router.patch('/:id/:friendId',addRemoveFriends)

router.use('/',getAllUsers)






module.exports = router
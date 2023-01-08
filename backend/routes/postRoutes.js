const express = require('express')
const { fetchUserPost, fetchFeedPosts, toggleLikePost, writeComment } = require('../controllers/posts')
const { tokenCheck } = require('../middlewares/auth')
const router = express.Router()


//middleware
router.use(tokenCheck)

//  READ
router.get('/',fetchFeedPosts)
router.get('/:id/posts',fetchUserPost)

//update
router.patch('/:id',toggleLikePost)
router.patch('/:id',writeComment)




module.exports = router///
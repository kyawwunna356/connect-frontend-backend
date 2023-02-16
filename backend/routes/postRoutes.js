const express = require('express')
const { fetchUserPost, fetchFeedPosts, toggleLikePost, writeComment, deletePost } = require('../controllers/posts')
const { tokenCheck } = require('../middlewares/auth')
const router = express.Router()


//middleware
router.use(tokenCheck)

//  READ
router.get('/',fetchFeedPosts)
router.get('/:id/posts',fetchUserPost)

//update
router.patch('/comment/:id',writeComment)
router.patch('/:id',toggleLikePost)
router.delete('/:id',deletePost)



module.exports = router///
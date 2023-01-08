const Post = require("../models/Post")
const User = require("../models/User")


// Create
const createPost = async (req,res) => {
    const fileName = req.fileName
    try {
        const { userId, description } = req.body
         const user = await User.findById(userId)
        const post = await Post.create({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        location: user.location,
        imagePath: fileName,
        likes: {},
        comments: [],
        profilePath: user.imagePath,
    })
        res.status(201).json(post)
    
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

//  Read
const fetchFeedPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1})
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}



const fetchUserPost = async (req,res) => {
    try {
        const {id} = req.params
        const posts = await Post.find({userId: id}).sort(-1)
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
 
}

//update 

const toggleLikePost = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const post = await Post.findById(id)
        if(post.likes.get(userId)){
            post.likes.delete(userId)
        } else{
            post.likes.set(userId ,true)
        }
        await post.save()
        res.status(200).json(post)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const writeComment = async (req,res) => {
    try{
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}



module.exports = {createPost,fetchUserPost,fetchFeedPosts,toggleLikePost,writeComment}
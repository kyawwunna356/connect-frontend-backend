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
        return res.status(201).json(post)
    
    } catch (err) {
        return res.status(409).json({message: err.message})
    }
}

//  Read
const fetchFeedPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1})
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}



const fetchUserPost = async (req,res) => {
    try {
        const {id} = req.params
        console.log('single-user-post',id)
        const posts = await Post.find({userId: id}).sort({createdAt:-1})
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(400).json({message: err.message})
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
        return res.status(200).json(post)
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

const writeComment = async (req,res) => {
    try{
        console.log('this reunfdf')
        const {id} = req.params
        const {userId,text} = req.body
        const post = await Post.findById(id)
        const user = await User.findById(userId)
        post.comments.push({
            userId,
            text,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePath: user.imagePath
        })
        await post.save()
        return res.status(200).json(post)
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}


const deletePost = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.findByIdAndDelete(id)
        return res.status(200).json(post)
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}



module.exports = {createPost,fetchUserPost,fetchFeedPosts,toggleLikePost,writeComment,deletePost}
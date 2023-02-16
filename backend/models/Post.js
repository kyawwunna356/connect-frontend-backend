const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePath: String,
    text: String,
    // likes: {
    //     type: Map,
    //     of: Boolean,
    // }
})

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: String,
    description: String,
    imagePath: String,
    profilePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: [commentSchema],
        default: []
    }

},{timestamps: true})

const Post = mongoose.model("Post",postSchema)

module.exports = Post

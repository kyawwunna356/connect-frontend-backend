const { default: mongoose, mongo } = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    lastName: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    email: {
        type: String,
        min: 5,
        max: 50,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 5,
        required: true,
    },
    imagePath: {
        type: String,
        default: "",
    },
    friends: {
        type: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
        // type: [String],
        default: [],
       
    },
    occupation: String,
    location: String,
    impressions: Number,
    viewedProfile: Number,

},{timestamps: true})

const User = mongoose.model('User',userSchema)

module.exports = User;
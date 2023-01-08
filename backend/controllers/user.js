const { default: mongoose, mongo } = require("mongoose")
const User = require("../models/User")

const getUser = async (req,res) => {
    const {id} = req.params
    console.log(id)
    const user = await User.findById(id).populate('friends','-password -friends')
    res.status(200).json(user)
}

const getAllUsers = async (req,res) => {
    const users = await User.find()
    res.status(200).json(users)
}

const addRemoveFriends = async (req,res) => {
    const {id,friendId} = req.params 
    const user = await User.findById(id)
    const friend = await User.findById(friendId)
 
    if(user.friends.includes(friendId)){
        user.friends = user.friends.filter(objId => objId.toString() !== friendId)
        friend.friends = friend.friends.filter(objId => objId.toString() !== id)
    } else {
        user.friends.push(friendId)
        friend.friends.push(id)
    }

    await user.save()
    await friend.save()
    const userwithFriendsPopulated = await User.findById(id).populate('friends','-password -friends')
    res.status(200).json(userwithFriendsPopulated.friends)

}



module.exports = {getUser,addRemoveFriends,getAllUsers}
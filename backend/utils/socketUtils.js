


//add the user when connected
const addUser = ({onlineUsers,userId,socketId}) => {
    let temp = onlineUsers
     !onlineUsers.some(user => user.userId === userId) && temp.push({userId,socketId})
     return temp
}


//disconnect
const removeUser = ({onlineUsers,socketId}) => {
    return onlineUsers.filter(user => user.socketId !== socketId)
}

//find a user 
const getUser = ({onlineUsers,receiverId}) => {
    return onlineUsers.find(user => user.userId === receiverId)
}

module.exports = {addUser, removeUser, getUser}
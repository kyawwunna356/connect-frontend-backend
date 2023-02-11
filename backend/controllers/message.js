const Message = require("../models/Message")

//get
const getMessage = async (req,res) => {
    const {conversation_id} = req.params
    try {
        const messages = await Message.find({conversation_id})
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
    
}


//post
const sendMessage = async (req,res) => {
    const {conversation_id} = req.params
    const {message,sender} = req.body
    console.log(message,sender)
    try {
        const createdMessage = await Message.create({conversation_id,sender,message})
        res.status(200).json(createdMessage)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
}

module.exports ={getMessage,sendMessage}
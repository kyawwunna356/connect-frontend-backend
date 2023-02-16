const Message = require("../models/Message")

//get
const getMessage = async (req,res) => {
    const {conversation_id} = req.params
    try {
        const messages = await Message.find({conversation_id})
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(400).json({message: err.message})
    }
    
}


//post
const sendMessage = async (req,res) => {
    const {conversation_id} = req.params
    const {message,sender} = req.body
    console.log(message,sender)
    try {
        const createdMessage = await Message.create({conversation_id,sender,message})
        return res.status(200).json(createdMessage)
    } catch (error) {
        return res.status(400).json({message: err.message})
    }
}

module.exports ={getMessage,sendMessage}
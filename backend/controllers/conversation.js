const Conversation = require("../models/Conversation")
const Message = require("../models/Message")

//get
const getConversations = async (req,res) => {
    const {userId} = req.params
    try {
        //return conversations where members array contain userId
        const conversations = await Conversation.find({members: {"$in" :  [userId]}}).populate('members','-password -friends')
        return res.status(200).json(conversations)
        
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//create a conversation
const createConversation = async (req,res) => {
    const {userId, friendId} = req.body
    try {
        const exist = await Conversation.find({ members : { '$all' : [userId, friendId] }})
        if(exist.length > 0){
            return res.status(400).json('conversation exists')
            
        }
        let conversation = await Conversation.create({
            members: [friendId,userId]
        })
        conversation = await conversation.populate('members', '-password -friends')
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const deleteConversation = async (req,res) => {
    const {converId} = req.params
    try {
        await Message.deleteMany({conversation_id: converId })
        const conversation = await Conversation.findByIdAndDelete(converId)
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


module.exports ={getConversations,createConversation, deleteConversation}
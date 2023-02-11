const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema({
    conversation_id: String,
    sender: String,
    message: String 

},{timestamps: true})

const Message = mongoose.model("Message",messageSchema)

module.exports = Message

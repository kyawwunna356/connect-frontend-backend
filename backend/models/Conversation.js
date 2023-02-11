const { default: mongoose } = require("mongoose");

const ConversationSchema = mongoose.Schema({
    members: {
        type: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
        
    }

},{timestamps: true})

const Conversation = mongoose.model("Conversation",ConversationSchema)

module.exports = Conversation

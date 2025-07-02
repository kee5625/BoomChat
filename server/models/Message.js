// Message model file
import mongoose from "mongoose";

// create the properties of a user
const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    receiverID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String,},
    image: {type: String,},
    seen: {type: Boolean, default: false}
}, {timestamps: true});


const Message = mongoose.model("Message", messageSchema);

export default Message;
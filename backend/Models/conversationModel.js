import mongoose from "mongoose";

const Convo = new mongoose.Schema({
    from:{
        type: String,
        default: ''
    },
    to:{
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    list: {
        type: [
            {
                reference:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: `User`,
                },
                sentBy:{
                    type:mongoose.Schema.Types.ObjectId, ref: `User`
                },
                messageType:{
                    type: String,
                    default: `message`
                },
                date:{
                    type: Date,
                    default: Date.now,
                },
                status:{
                    type: String,
                    default: ``,
                },
                votingList:{
                    type: [{
                        from: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: `User`
                        },
                        text: {type:String, default:``},
                    }],
                    default: []
                },
                maskFrom:{
                    type: [String],
                    default: []
                },
                message: {
                    type: String,
                    default: ''
                },
                reactions:{
                    type: [{
                        emoji: {type:String, default:''},
                        from:{
                            type: mongoose.Schema.Types.ObjectId,
                            ref:`User`
                        }
                    }],
                    default: []
                    
                },
            }
        ],
        default: []
    }
})
Convo.index({ "list.votingList.from": 1 })
export const Conversation = new mongoose.model(`Conversation`, Convo,`Conversations`)
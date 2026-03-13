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
                ref:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: `User`,
                },
                sentBy:{
                    type:mongoose.Schema.Types.ObjectId, ref: `User`
                },
                date:{
                    type: Date,
                    default: Date.now,
                },
                status:{
                    type: String,
                    default: ``,
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

export const Conversation = new mongoose.model(`Conversation`, Convo,`Conversations`)
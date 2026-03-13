import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    Admins: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`,
        }],
        default: []
    },
    Contacts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`,
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

export const Group = mongoose.model('Group', GroupSchema, `Groups`)
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
    },
    contacts:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`,
        }],
        default:[]
    },
    
    picks:{
        type: [{
            userId: {type: mongoose.Schema.Types.ObjectId,ref: `User`,},
            pick: {type:String, default:"",trim:true}
        }],

    },
    dueDate:{  
        type: Date,
        default: null
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
}) 

const ProjectVote = new mongoose.model(`ProjectVote`, Schema, `ProjectVote`)
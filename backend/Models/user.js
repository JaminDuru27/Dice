import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'
import { ProjectSchema } from './projectModel.js'
const arrayValidator = {
    validator: v => Array.isArray(v),
    message: props => `${props.path} must be an array`
};
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        minlength: [3, 'Username must be at least 3']
    },
    online:{
        type: Boolean,
        default: false,
    },
    currentSocketId:{
        type: String,
    },
    adminGroups: {
        type: [String],
        default: []
    },
    settings:{
        type: {
            ringtoneId: {
                type: String,
                default: `default`
            },
            theme: {
                type: String,
                enum: [`normal`, `dark`, `light`],
                default: `normal`
            },
            fontsize: {
                type: Number,
                default: 100,
                min: [0, `Font Size must be at least 50%`],
                max: [200, `Font Size can't be more than 200%`]
            },
            keyboardnav: {
                type: Boolean,
                default: false
            },
            reducedMotion: {
                type: Boolean,
                default: false
            },
            dislexicfont: {
                type: Boolean,

                default: false
            },
            linespacing: {  
                type: Number,
                default: 100,
                min: [0, `Line Spacing must be at least 50%`],
                max: [200, `Line Spacing can't be more than 200%`]
            }
        },
        default: {}
    },
    blockedList:{
        type: [String],
        default: []
    },
    friendsList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: `User`,
        default: [],
        validate: arrayValidator
    },
    currentGroup: {
        type: String,
        default: null
    },
    groups:{
        type: [{
            name: {
                type: String,
                required: [true, `Group Name is Required`],         
                trim: true,
                minlength: [3, `Group Name must be at least 3 characters`]
            },
            id: {
                type: String,
                required: [true, `Group Id is Required`],
                trim: true,
                minlength: [3, `Group Id must be at least 3 characters`]
            },  
            members: {
                type: [Object],
                default: [],        
                validate: arrayValidator
            }
        }],
        default: [],
    },
    badges: {
        type: [String],
        default: [],
    },
    remarks: {
        type: [String],
        default: [],
    },
    projects:{
        type: [ProjectSchema],
        default: [],
        validate:{
            validator: function(v){
                if (!Array.isArray(v)) return false
                return true
            },
            message: props=> `something is wrong with the data `
        }
    },
    userUniqueId:{
        type: String,
        trim: true,
        minlength: [5, 'Email or Unique Id must be at least 5'],
        unique: [true, `Sorry, Name Taken`],
        required: [true, `Email or Unique Id is Required`]
    },
    password:{
        type: String,
        minlength: [6, 'Password must be at least 6'],
        select: false,
        required: [true, `Password is Required`],
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
})
// use async/await style here; mongoose will handle the promise
// do NOT declare a `next` parameter, it will be undefined for async hooks
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return; // nothing to do
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // any thrown error will bubble and abort the save
})

userSchema.methods.toPublicProfile = function(){
    return {
        projects: this.projects,
        // there is no dedicated email field; expose unique id instead
        userUniqueId: this.userUniqueId,
        friendsList: this.friendsList,
        blockedList: this.blockedList,
        online: this.online,
        currentSocketId: this.currentSocketId,
        username: this.username,
        lastLogin: this.lastLogin,
        settings: this.settings,
        groups: this.groups,
        contacts: this.contacts,
        badges: this.badges,
        remarks: this.remarks,
        createdAt: this.createdAt,
        _id: this._id
    }
}

export const User = mongoose.model('User', userSchema, `Users` )
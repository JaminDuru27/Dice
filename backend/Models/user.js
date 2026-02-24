import mongoose, { Mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'
import { ProjectSchema } from './projectModel.js'
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        minlength: [3, 'Username must be at least 3']
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
                min: [50, `Font Size must be at least 50%`],
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
                min: [50, `Line Spacing must be at least 50%`],
                max: [200, `Line Spacing can't be more than 200%`]
            }
        },
        default: {}
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
        required: [true, `Password is Required`]
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
        username: this.username,
    }
}

export const User = mongoose.model('Dice', userSchema, `Users` )
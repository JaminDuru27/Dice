import mongoose from "mongoose";

// reusable validator ensuring a field is an array
const arrayValidator = {
    validator: v => Array.isArray(v),
    message: props => `${props.path} must be an array`
};

export const ProjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, `Project Name is Required`],
        trim: true,
        minlength: [3, `Project Name must be at least 3 characters`]
    },
    projectId:{
        type: String,
        required: [true, `Project Id is Required`],
        trim: true,
        minlength: [3, `Project Id must be at least 3 characters`]
    },
    percentageCompletion: {
        type: Number,
        default: 0,
    },
    todos:{
        type: [{
            title: {
                type: String,
                required: [true, `Todo Title is Required`],
                trim: true,
                minlength: [3, `Todo Title must be at least 3 characters`]
            },
            description: {
                type: String,
                trim: true,
                maxlength: [500, `Todo Description can't be more than 500 characters`]
            },
            completed: {    
                type: Boolean,
                default: false
            },
            dueDate: {  
                type: Date,
                default: null
            },
            badges: {
                type: [String],
                default: []
            }
        }],
        default: [],
        validate: arrayValidator
    },
    description:{
        type: String,
        trim: true,
        maxlength: [500, `Description can't be more than 500 characters`]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    tasks:{ 
        type: [Object],
        default: [],
        validate: arrayValidator   
    }
})

// update timestamp on save
ProjectSchema.pre('save', function(){
    this.updatedAt = new Date()
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    this.percentageCompletion = percent === Infinity?0:percent
    if(this.percentageCompletion >= 100)this.completed = true
})

// export model for convenience when working with standalone projects
export const Project = mongoose.model('Project', ProjectSchema);

import mongoose from "mongoose"
const NotificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
    },
    isRead:{
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}) 

export const Notification = mongoose.model('Notification', NotificationSchema, 'Notifications') 
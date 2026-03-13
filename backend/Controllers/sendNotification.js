import { getIO, Users } from "../index.js"
import { Notification } from "../Models/notificationModel.js"
import { User } from "../Models/user.js"

export async function SendNotification(req, res){
    try{
        const fromId = req.user.userId
        const {toId, message, data} = req.body

        const touser = await User.findById(toId)
        if(!touser){
            return res.status(400).json({
                success: false,
                message: `Reciepient Doesnt Exists`
            })
        }
        const notification = await Notification.create({
            from: fromId,
            to: toId,
            message: message,
            data: data,
        })
        notification.createdAt = new Date()
        const socketId = Users[touser._id.toString()]
        const io = getIO()
        io.to(socketId).emit(`sentNotification`, notification)
        
        res.status(201).json({
            success: true,
            message: `Request Sent To ${touser.username}`
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
}
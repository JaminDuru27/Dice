import { Notification } from "../Models/notificationModel.js";
import { User } from "../Models/user.js"

export async function GetNotificatins(req,res) {
    try{
        const userId = req.user.userId

        const user  = User.findById(userId)
        if(!user){
            return res.status(400).json({
                success: false,
                message: `No User Found`
            })
        }
        const notifications = await Notification.find({
        to: req.user.userId
        })
        .populate({
            path: `from`,
            select: `_id username`
        }) // optional
        .populate({
            path: `to`,
            select: `_id username`
        }) // optional
        .sort({ createdAt: -1 }) // newest first
        .lean();
        res.status(200).json({
            success: true,
            message:``,
            data: notifications
        })
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
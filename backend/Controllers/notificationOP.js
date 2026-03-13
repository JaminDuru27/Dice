import { Notification } from "../Models/notificationModel.js"

export  async function NotificationOp(req, res) {
    try{
        const {operation, id} = req.query
        if(!operation || !id){
            res.status(400).json({
                success: false,
                message: `Query Not Provided`
            })
        }
        if(operation === `DELETE`){
            const deletedNotification = await Notification.findOneAndDelete({
                _id: id
            });

            if (!deletedNotification) {
                return res.status(404).json({ success:false, message: "Notification not found" });
            }

            res.json({
                success: true,
                message: "Deleted successfully",
            });
        }else if(operation === `MARKASREAD`) {
            const notification = await Notification.findById(id);
            if (!notification) {
                return res.status(404).json({ success:false, message: "Notification not found" });
            }
            notification.isRead = true
            await notification.save()

            res.json({
                success: true,
                message: "Marked As Read successfully",
            });
        }   
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
}
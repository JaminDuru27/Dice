import { getIO, Users } from "../index.js   "
import { User } from "../Models/user.js"

export async function SocketConnect(req, res){
    try{
        const userId = req.user.userId
        const d = req.body
        const userSocketRefId = d.id
        if (!userSocketRefId){
            return res.status(401).json({
                success: false,
                message: `User Socket Ref Id Not Given`
            })
        }
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: `User Not Found`
            })
        }
        const socketId = Users[userSocketRefId];
        if (!socketId) {
            return res.status(400).json({ message: "User not connected" });
        }
        const io = getIO()
        const socket = io.sockets.sockets.get(socketId);
        //join contacts
        user.friendsList.map(contact=>{
            const contactsocketId = Users[contact._id.toString()]
            if(contactsocketId){
                const room_id  = [userId,contact._id.toString()].sort().join("_")
                socket.join(room_id)
                // io.to(room_id).emit('alert', `Joined Room ${room_id} ${contact._id}`)
            }
        })  

        user.currentSocketId = socketId 
        await user.save()
        res.status(200).json({
            success: true,
            message: `Successfully Connected To all Contacts`,
            data: user,
        })  
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}
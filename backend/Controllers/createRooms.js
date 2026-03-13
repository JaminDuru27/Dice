import { getIO } from ".."

export function createRooms(req, res){
    try {
        const userId = res.user.userId
        const socketid = req.body
        const socket = getIO()
        console.log(socket, userId)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
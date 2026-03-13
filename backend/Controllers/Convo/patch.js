import { getIO, Users } from "../../index.js"
import { User } from "../../Models/user.js"

export async function ConvoPatch(req, res, Method){
    try{
        const {convoId,location, type, arrayFilters, data} = req.body
        const userId = req.user.userId
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }     
        const convo = await Method.findOneAndUpdate(
            {_id: convoId}, 
            {
                [`$${type || 'set'}`]: {
                   [`${location}`]: data
                }
            }, 
            {
                arrayFilters: (arrayFilters || []),
                returnDocument: `after`,
                upsert: false,
                runValidators: true
            }
        )
        const io = getIO()
        const socketid = Users[convo.from]
        const rscoketid = Users[convo.to]
        io.to(socketid).emit(`update-chat`)
        io.to(rscoketid).emit(`update-chat`)

        res.status(200).json({
            success: true,
            message: `Method Updated Successfully`,
            data: convo
        })

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
import { getIO, Users } from "../index.js"
import { Conversation } from "../Models/conversationModel.js"
import { Group } from "../Models/groupModel.js"
import { User } from "../Models/user.js"

export async function UpdateConversation(req,res){
    try {
        const {id, type, message, messageType, reactions} = req.body
        if(type === `1`){
            const userId = req.user.userId
            
            //check if reciever still Exists
            const recipient = await User.findById(id)
            if(!recipient){
                return res.status(400).json({success: false, message:`Reciever Not Found`})
            }

            //search convo based on ur id and recepient id
            let convo
            convo = await Conversation.findOne({
                from: userId, to: id, type
            })
            if(!convo)
            convo = await Conversation.findOne({
                to: userId, from: id, type
            })

            if(!convo){
                convo = await Conversation.create({
                    to: id,    
                    from: userId,    
                    type,
                    list: []
                })
            }
            await convo.save()
            const obj = {
                message, reactions,
                messageType,
                sentBy:userId,
                status: `delivered`    

            }
            if(id) obj.id = id
            convo.list.push(obj)
            await convo.save()
            await convo.populate("list.sentBy", "username _id")
            
            //send update onscket
            const io = getIO()
            const socketid = Users[id]
            const usersocketid = Users[userId]
            if(usersocketid){
                io.to(socketid).emit(`update-chat`)
            }
            
            res.status(200).json({
                success: true,
                message: `Successfully added convo`,
                data: convo,
                userId,
            })

        }
        if(type === `2`){
            const userId = req.user.userId
            
            //check if reciever still Exists
            const group = await Group.findById(id)
            if(!group){
                return res.status(400).json({success: false, message:`Reciever Not Found`})
            }
            //search convo based on ur id and recepient id
            let convo
            convo = await Conversation.findOne({
                 to: id, type
            })
            if(!convo){
                return res.status(400).json({
                    message: `No Conversation Found`,
                    success:false,
                })
            }
            

            if(!convo){
                convo = await Conversation.create({
                    to: id,    
                    from: userId,    
                    type,
                    list: []
                })
            }
            await convo.save()
            const obj = {
                message, reactions,
                sentBy:userId,
                messageType,
                status: `delivered`    

            }
            if(id) obj.id = id
            convo.list.push(obj)
            await convo.save()
            await convo.populate("list.sentBy", "username _id")
            
            //send update onscket
            const io = getIO()
                group.Contacts.forEach(contact=>{
                    const id = contact.toString()
                    const socketid = Users[id]
                    const usersocketid = Users[userId]
                    if(usersocketid)
                    io.to(socketid).emit(`update-chat`)

                })
            
            res.status(200).json({
                success: true,
                message: `Successfully added convo`,
                data: convo,
                userId,
            })

        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
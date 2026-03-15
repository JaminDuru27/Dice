import { Conversation } from "../Models/conversationModel.js"
import { Group } from "../Models/groupModel.js"
import { User } from "../Models/user.js"

export async function GetConversations(req,res){
    try {
        const userId = req.user.userId
        const {id, type} = req.query
        const user = await User.findOne({
            _id:userId
        })
        if(!user){
            return res.status(400).json({
                success: false,
                message:`Unauthorized user`
            })
        }
        if(Number(type) === 1){
            const reciever = await User.findOne({
                _id:id
            })
            if(!reciever){
                return res.status(400).json({
                    message: `Reciever Nor Found`,
                    success: false
                })
            }
            let convo
            convo = await Conversation.findOne({
                from: userId, to: id, type
            })
            if(!convo)
            convo = await Conversation.findOne({
                to: userId, from: id, type
            })

            if(!convo){
                convo = undefined
                // convo = await Conversation.create({
                //     to: id,    
                //     from: userId,    
                //     type,
                //     list: []
                // })
            }
            if(convo){
                await convo.save()
                await convo.populate("list.sentBy", "username _id")
            }

            const isFriend = user.friendsList.find(f=>f.toString() === id)
            res.status(200).json({
                success: true,
                message: `Successfully retrieved convo`,
                data: convo,
                userId: userId,
                refData: reciever,
                isFriend: isFriend?true:false
            }) 
        }

        if(Number(type) === 2){
            const group = await Group.findOne({
                _id:id
            })
            if(!group){
                return res.status(400).json({
                    message: `Reciever Nor Found`,
                    success: false
                })
            }
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
            await convo.save()
            await convo.populate("list.sentBy", "username _id")
            const isMember = group.Contacts.find(c=>c.toString() === userId)
            res.status(200).json({
                success: true,
                message: `Successfully retrieved convo`,
                data: convo,
                userId: userId,
                refData: group,
                isMember: isMember?true:false
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
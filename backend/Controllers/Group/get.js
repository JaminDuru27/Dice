import mongoose from "mongoose"
import { Group } from "../../Models/groupModel.js"

export async function GetGroup(req, res){
    try{
        const userId= req.user.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: `User Invalid`
            })
        }

        const {id} = req.params
        if(id){
            const id = new mongoose.Types.ObjectId(userId)
            const groups = await Group.find({
                _id: id.toString()
            })//check is use id i un cintcts too
            .lean()
            // .populate([`createdBy`, `Admins`, `Contacts`, `, `list.reactions.from`])
            const isMember = group.Contacts.find(c=>c.toString() === userId)
            res.status(200).json({
                success: true,
                message: `Successfully fetched group`,
                data: group,
                isMember: isMember
            })
        }else{
            const id = new mongoose.Types.ObjectId(userId)
            const groups = await Group.find({
                $or:[
                    {createdBy: id},
                    {Contacts: id},
                ]
            })//check is use id i un cintcts too
            .lean()
            // .populate([`createdBy`, `Admins`, `Contacts`, `list.sentBy`, `list.reactions.from`])
 
            res.status(200).json({
                success: true,
                message: `Successfully fetched groups`,
                data: groups
            })
        }

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
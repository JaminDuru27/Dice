import { Group } from "../../Models/groupModel.js"

export async function GetGroup(req, res){
    console.log(`get grip`)
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
            const group = await Group.findOne({
                _id: id
            })
            .populate([`createdBy`, `Admins`, `Contacts`, `list.sentBy`, `list.reactions.from`])
            const isMember = group.Contacts.find(c=>c.toString() === userId)
            res.status(200).json({
                success: true,
                message: `Successfully fetched group`,
                data: group,
                isMember: isMember
            })
        }else{
            const groups = await Group.find({
                createdBy: userId
            })//check is use id i un cintcts too
            .populate([`createdBy`, `Admins`, `Contacts`, `list.sentBy`, `list.reactions.from`])
 
            res.status(200).json({
                success: true,
                message: `Successfully fetched groups`,
                data: groups
            })
        }

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
import { Group } from "../../Models/groupModel.js"

export async function PostGroup(req, res){
    try{
        const {name} = req.body
        const userId= req.user.userId
        if(!userId){
            return res.status(400).json({
                success: false,
                message: `User Invalid`
            })
        }
        const group = new Group({
            createdBy: userId,
            name,
        })
        group.Contacts.push(userId)

        await group.save()

        res.status(201).json({
            success: true,
            message: `Successfully created group`,
            data: group
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
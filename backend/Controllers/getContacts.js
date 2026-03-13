import { User } from "../Models/user.js"

export async function GetContacts(req, res){
    try{
        const {name} = req.query    
        const userId = req.user.userId
        if(!name){
            return res.status(400).json({success: false, message: `invalid input`})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({success: false, message: `User not found`})
        }
        await User.find({
            $and: [
                {
                $or: [
                    { username: { $regex: name, $options: 'i' } },
                    { userUniqueId: { $regex: name, $options: 'i' } }
                ]
                },
                { _id: { $ne: userId } } // exclude yourself
            ]
        })
        .then(users=>{
            let blockedlist = user?.blockedList || []
            let friendslist = user?.friendsList || []
            console.log(user.friendsList)
            res.status(200).json({
                success: true,
                users: [...users.map(u=>{
                    let status = `stranger`
                    if([...blockedlist.map(e=>e.toString())].includes(u._id.toString()))status = `blocked`    
                    if([...friendslist.map(e=>e.toString())].includes(u._id.toString()))status = `friend`
                    return ({
                        username: u.username,
                        online: u.online,
                        id: u._id,
                        status
                    })
                })]
            })
        })
        .catch(err=>{
            console.log(err.message)
            res.status(500).json({
                success: false,
                message: err.message
            })
        })


    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
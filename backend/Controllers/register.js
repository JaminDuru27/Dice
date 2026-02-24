import { User } from "../Models/user.js"

export async function Register(req, res){
    try{
        const {username, userUniqueId, password} = req.body
        //check id user exists
        const userExists = await User.findOne({
            $or:[{userUniqueId}, {username}]
        })
        if(userExists){
            return res.status(400).json({
                success: false,
                message: `User with email and password exists`
            })
        }

        const user = await User.create({
            username,
            userUniqueId,
            password
        })
        user.createdAt = new Date() 
        res.status(201).json({
            success: true,
            message: `Account Successfully Created`,
            data: user.toPublicProfile()
        })
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

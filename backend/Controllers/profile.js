import { User } from '../Models/user.js'

export async function Profile(req, res){
    try{
        const userId = req.user.userId
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
        res.status(200).json({
            success: true,
            message: `Welcome ${user.username}`,
            data: user.toPublicProfile()
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
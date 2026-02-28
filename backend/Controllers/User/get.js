export async function UserGet(req,res, User){
    try{
        const location = req.params.location
        const userId = req.user.userId
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        const user = await User.findById(userId).select(location).lean()
        if (!user){
            return res.status(404).json({
                success: false,
                message: `User Not Found`
            })
        }
        res.status(200).json({
            success: true,
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
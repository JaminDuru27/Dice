export function UsersDelete(req, res){
    try{
        const userId = req.user.userId
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
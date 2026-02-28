
export async function UsersPatch(req, res, User){
    try{
        const {location, type} = req.query
        const data  = req.body
        const userId = req.user.userId
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }
        
        console.log(location, type, data)
        const user = await User.findOneAndUpdate(
            {_id: userId}, 
            {
                [`$${type || 'set'}`]: {
                   [`${location}`]: data
                }
            }, 
            {
                new: true,
                upsert: false,
                runValidators: true
            }
        )

        await user.save()

        res.status(200).json({
            success: true,
            message: `User Updated Successfully`,
            data: user.toPublicProfile()
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
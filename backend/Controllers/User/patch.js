
export async function UsersPatch(req, res, Method){
    try{
        const {location, type, arrayFilters, data} = req.body
        const userId = req.user.userId
        if (!userId){
            return res.status(401).json({
                success: false,
                message: `Unauthorized`
            })
        }     
        const user = await Method.findOneAndUpdate(
            {_id: userId}, 
            {
                [`$${type || 'set'}`]: {
                   [`${location}`]: data
                }
            }, 
            {
                arrayFilters: (arrayFilters || []),
                returnDocument: `after`,
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
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
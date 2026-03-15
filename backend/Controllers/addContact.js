import { User } from "../Models/user.js"

export async function AddContact(req, res){
    try{
        const userId = req.user.userId
        const contactId = req.body.id
        const user =  await User.findById(userId)
        if(!user){
            res.status(400).json({
                success:false,
                message: `Your account doesn't Exist`
            })
        }
        const contact = await User.findById(contactId)
        if(!contact){
            res.status(400).json({
                success:false,
                message: `Contact Doesnt Exist`
            })
        }
        await User.findByIdAndUpdate(userId, {
            $addToSet: { friendsList: contactId } // instead of $push
        });
        await User.findByIdAndUpdate(contactId, {
            $addToSet: { friendsList: userId } // instead of $push
        });
        await user.save()
        await contact.save()
        res.status(200).json({
            success: true,
            message: `Contact Successfully Added`
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
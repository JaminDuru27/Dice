import { User } from "../Models/user.js"

export async function UpdateSettings(req, res){
    try{
        const data = req.body
        if(!data){
            return res.status(401).json({
                success:false,
                message: `Settings Data Not Given`
            })
        }
        const userId = req.user.userId
        if(!userId){
            return res.status(401).json({
                success:false,
                message: `User Not Found, Please Login`
            })
        }
        const {
            dislexicfont,fontsize,keyboardnav,linespacing,
            reducedMotion, ringtoneId, theme
        } = data   

        const user = await User.findById(userId)
        if(!user){
            return res.status(401).json({
                success:false,
                message: `User Not Found, Please Login`
            })
        }
        user.settings.ringtoneId = ringtoneId  
        user.settings.theme = theme  
        user.settings.fontsize = fontsize  
        user.settings.keyboardnav = keyboardnav  
        user.settings.reducedMotion = reducedMotion  
        user.settings.dislexicfont = dislexicfont  
        user.settings.linespacing = linespacing

        await user.save()
        res.status(200).json({
            success: true,
            message: `Updated Settings`,
            data: user.toPublicProfile()
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
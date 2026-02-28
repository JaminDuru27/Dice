import { User } from '../Models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function Login(req, res){
    try {
        const {userUniqueId, password} = req.body
        //validate input
        if(userUniqueId === `` || password === ``){
            return res.status(400).json({
                success: false,
                message: `Please Check Input`,
            })
        }
        //find user
        const user = await User.findOne({userUniqueId}).select(`+password`)
        if(!user){
            return res.status(401).json({
                success:false,
                message: `Invalid Unique Id or Email and Password`
            })  
        }

        //compare oasswords
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: `password invalid`
            })
        }

        // Generate JWT Token
        const token = jwt.sign({
            userId: user._id, userUniqueId: userUniqueId
        },
        process.env.JWT_SECRET,
        {expiresIn: `1d`}
        ) 
        res.cookie(`access_token`, token,{
            httpOnly: true,
            sameSite: `lax`,
            secure: false
        })

        // ..yodate lastlofin
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            success: true,
            message: `Login Successful`,
            data: user.toPublicProfile(),
            token:token,
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
        }
    
}
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export function VerifyToken(req, res, next){
    try{
        const token = req.cookies.access_token
        if(!token){
            return res.status(401).json({
                success: false,
                message: `Access Denied`
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: `Access Denied`
        })
    }
}
import express from 'express'
import { Register } from '../Controllers/register.js'
import { Login } from '../Controllers/login.js'
import { VerifyToken } from '../Middlewares/verifyToken.js'
import { Profile } from '../Controllers/profile.js'
import { UpdateSettings } from '../Controllers/updatesettings.js'
import { AddProject } from '../Controllers/addProject.js'
import { GetProject } from '../Controllers/getProject.js'
import { User } from '../Models/user.js'
import { UsersPatch } from '../Controllers/User/patch.js'
import { UserGet } from '../Controllers/User/get.js'
import { GetWeather } from '../Controllers/getWeather.js'
export  const userRouter = express.Router()

userRouter.post('/register', Register)
userRouter.post('/login', Login)
userRouter.get('/profile', VerifyToken, Profile)  
userRouter.patch('/Users', VerifyToken, (req,res)=>UsersPatch(req,res, User))  
userRouter.get('/Users/:location', VerifyToken, (req,res)=>UserGet(req,res, User))  
userRouter.patch('/updateSettings', VerifyToken, UpdateSettings)  
userRouter.patch('/addproject', VerifyToken, AddProject)  
userRouter.post('/getproject', VerifyToken, GetProject)  
userRouter.post('/weather', VerifyToken, GetWeather)  
userRouter.get('/log', (req,res)=>{
    return res.status(200).json({message: `route works`})
})
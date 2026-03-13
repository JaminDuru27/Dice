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
import { SocketConnect } from '../Controllers/socketConnect.js'
import { Logout } from '../Controllers/logout.js'
import { AddContact } from '../Controllers/addContact.js'
import { GetContacts } from '../Controllers/getContacts.js'
import { SendNotification } from '../Controllers/sendNotification.js'
import { GetNotificatins } from '../Controllers/getNotifications.js'
import { NotificationOp } from '../Controllers/notificationOP.js'
import { GetFriendsList } from '../Controllers/getFriendsList.js'
import { GetConversations } from '../Controllers/getconversations.js'
import { UpdateConversation } from '../Controllers/updateConversation.js'
import { Conversation } from '../Models/conversationModel.js'
import { ConvoPatch } from '../Controllers/Convo/patch.js'
import { PostGroup } from '../Controllers/Group/post.js'
import { GetGroup } from '../Controllers/Group/get.js'
export  const userRouter = express.Router()

userRouter.post('/register', Register)
userRouter.post('/login', Login)
userRouter.get('/profile', VerifyToken, Profile)  
userRouter.patch('/Users', VerifyToken, (req,res)=>UsersPatch(req,res, User))  
userRouter.patch('/Convo', VerifyToken, (req,res)=>ConvoPatch(req,res, Conversation))  
userRouter.get('/Users/:location', VerifyToken, (req,res)=>UserGet(req,res, User))  
userRouter.patch('/updateSettings', VerifyToken, UpdateSettings)  
userRouter.patch('/addproject', VerifyToken, AddProject)  
userRouter.post('/getproject', VerifyToken, GetProject)  
userRouter.post('/socketConnect', VerifyToken, SocketConnect)  
userRouter.post('/weather', VerifyToken, GetWeather)  
userRouter.post('/logout', VerifyToken, Logout)  
userRouter.patch('/addContact', VerifyToken, AddContact)  
userRouter.get('/getNotifications', VerifyToken, GetNotificatins)  
userRouter.post('/sendNotifications', VerifyToken, SendNotification)  
userRouter.get('/getContacts', VerifyToken, GetContacts)  
userRouter.get('/getFriendsList', VerifyToken, GetFriendsList)  
userRouter.patch('/notificationOp', VerifyToken, NotificationOp)  
userRouter.get('/getConversations', VerifyToken, GetConversations)  
userRouter.patch('/updateConversation', VerifyToken, UpdateConversation)  
//group
userRouter.post('/group', VerifyToken, PostGroup) //add group  
// userRouter.delete('/Users/group', VerifyToken, UpdateConversation) //remove group  
userRouter.patch('/group', VerifyToken, (req,res)=>UsersPatch(req,res,Group)) //updategroup group  
userRouter.get('/group', VerifyToken, GetGroup) //get group  

userRouter.get('/log', (req,res)=>{
    return res.status(200).json({message: `route works`})
})
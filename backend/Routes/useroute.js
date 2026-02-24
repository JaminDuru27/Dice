import express from 'express'
import { Register } from '../Controllers/register.js'
import { Login } from '../Controllers/login.js'
export  const userRouter = express.Router()

userRouter.post('/register', Register)
userRouter.post('/login', Login)
userRouter.get('/profile', ()=>{
    
})
userRouter.get('/log', (req,res)=>{
    return res.status(200).json({message: `route works`})
})
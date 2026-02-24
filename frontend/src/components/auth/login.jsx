import { useRef } from "react"
import { Input } from "./input"
import { motion } from "framer-motion"

export function Login({setAuthState, onSubmit}){
    const uniquename = useRef(undefined)
    const password = useRef(undefined)
    
    return (
        <motion.div 
        animate={{opacity:[0,1], translateY: [-10,0]}}
        style={{boxShadow:`0px 0px 25px -10px black`}}

        
        className=" w-full  h-fit z-10 overflow-hidden border border-white/30 bg-black/90 rounded-2xl p-4  ">

            <div className="logo flex w-full text-white flex-row sm:flex-col justify-center items-center gap-2">
                <div className="Dice  flex items-center w-16 h-16 justify-center bg-white/20 rounded-full">D</div>
                <div className="Dice">Dice</div>
            </div>
            <div className="auth state w-full text-center my-4">Login</div>
            <div>
                <Input title="unique name or email " key={0} required={true} onInput={(v)=>{uniquename[`current`] = v}}/>
                <Input title="password" key={0} required={true} onInput={(v)=>{password[`current`] = v}}/>
            </div>
            <div className="text-[.8rem] my-4 ">or<span 
            onClick={()=>{
                setAuthState(`register`)
            }}
            className="border-b-white cursor-pointer p-2 w-fit">Register</span></div>
            <div 
            onClick={async ()=>{onSubmit({state:`login`, userUniqueId:uniquename.current, password:password.current})}}
            className="submit text-[.8rem] cursor-pointer w-full border border-white/20 p-2 flex justify-center items-center capitalize  rounded-2xl bg-black cursor-pointer  ">sumbit</div>

        </motion.div>
    )
}
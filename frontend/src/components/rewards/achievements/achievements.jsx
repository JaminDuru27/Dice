import { motion } from "framer-motion";
import { Trophy, Unlock } from "lucide-react";
export function Achievement({achievement,setAchievement}){
    return (
        <motion.div 
        onClick={()=>{setAchievement(null)}}
        initial={{opacity:0}}
        animate = {achievement?{opacity:1, display:`flex`}:{opacity:0 , display:`none`}}
        style={{backgroundImage:`linear-gradient(180deg, #0dc5a5, #7300c7)`}}
        className="absolute top-0 left-0 w-full flex flex-col gap-5 justify-center items-center h-screen z-30 ">
            <Trophy size={80} className="text-amber-500"/>
            <div className="text-amber-400 capitalize text-2xl">{achievement?.name}</div>
            <div className=" text-lg capitalize text-white flex gap-2 items-center"
            >Achievement unlocked
            {<Unlock/>}
            </div>
        </motion.div>
    )
}
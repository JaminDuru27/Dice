import { motion } from "framer-motion";
import { LucideBadgeInfo, Trophy, Unlock } from "lucide-react";
export function Badge({badge,setBadge}){
    return (
        <motion.div 
        onClick={()=>{setBadge(null)}}
        initial={{opacity:0}}
        animate = {badge?{opacity:1, display:`flex`}:{opacity:0 , display:`none`}}
        style={{backgroundImage:`linear-gradient(rgb(104 106 82), rgb(255 105 13))`}}
        className="absolute top-0 left-0 w-full flex flex-col gap-5 justify-center items-center h-screen z-20 ">
            <motion.div 
            animate={{rotate:360}}
            transition={{repeat:Infinity, duration:120}}
            className="position z-[-10] absolute top-1/2 left-1/2 w-full h-full  p-3 translate-[-50%]">
                <Beam rotation = {40}/>
                <Beam rotation = {80}/>
                <Beam rotation = {120}/>
                <Beam rotation = {160}/>
                <Beam rotation = {200}/>
                <Beam rotation = {240}/>
                <Beam rotation = {280}/>
                <Beam rotation = {320}/>
                <Beam rotation = {360}/>
            </motion.div>
            <LucideBadgeInfo size={80} className="text-amber-500"/>

            <div className="text-amber-400 capitalize text-2xl">{badge?.name}</div>
            <div className=" text-lg capitalize text-white flex gap-2 items-center"
            >Badge unlocked
            {<Unlock/>}
            </div>
        </motion.div>
    )
}
export function Beam({rotation}){
    return (
        <div 
        style={{rotate:rotation + `deg`, boxShadow: `0px 0px 27px yellow`}}
        className={`beam opacity-[1]  absolute top-1/2 rounded-2xl blur-2xl left-1/2 w-[100%] h-10 translate-[-50%] bg-amber-300 `}>
        </div>
    )
}
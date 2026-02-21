import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useState } from "react"

export function MyLog({text, by, key, time, status}){
    const colored = `animate-fade-in-up bg-gradient-to-r from-blue-500 to-indigo-700 text-white p-2 rounded-2xl w-fit`
    const [hovered , setHovered] = useState(false)
    return (
        <div 
        key={`k3030k0r032,${key}`}
        className="w-full h-fit flex justify-end  relative">
            <motion.div 
                onHoverStart={()=>{setHovered(true)}}
                onHoverEnd={()=>{setHovered(false)}}
                whileInView ={{opacity: [0, 1], translateY:[50, 0]}}
                transition={{delay: 0.1 * key}}
                initial={{opacity: 0, translateY: 50}}
                animate={{opacity: [0, 1], translateY:[50, 0]}}
                className={`flex  items-center relative top-0  right-0 w-fit justify-end h-fit gap-2 `}>
                    <div className="reactions w-fit p-2 rounded-2xl h-5 bg-white/20"></div>

                    <div 
                    style={{boxShadow:`2px 2px 24px -14px black`}}
                    className="relative p-1 px-1 sm:p-2 sm:px-4 rounded-2xl bg-white/20 w-fit  overflow-hidden border border-white/20 text-[.8rem] ">
                        <div className="bgs w-full h-full absolute top-0 left-0 ">
                            {[1,2,3, 4, 5,].map((e, i)=>{
                                const randcolors = [`bg-pink-600/40`, `bg-purple-600/40`, `bg-indigo-600/40`, `bg-violet-800-600/40`, `bg-fuchsia-600/40`]
                                const randpos = [
                                    {top: "4", left: "4"},
                                    {top: "8", left: "8"},
                                    {top: "12", left: "12"},
                                    {top: "16", left: "16"},
                                    {top: "20", left: "20"}
                                ] 
                                const randSize = [`w-10`, `w-20`, `w-30`, ]                       
                                const randYDir = [`top`, `bottom`]
                                const randXDir = [`left`, `right`]
                                const colors = randcolors.sort(()=> Math.random() - 0.5)
                                const pos = randpos.sort(()=> Math.random() - 0.5)  
                                const rx = randXDir[Math.floor(Math.random() * randXDir.length)]
                                const ry = randYDir[Math.floor(Math.random() * randYDir.length)]
                                const size = randSize[Math.floor(Math.random() * randSize.length)]
                                return (
                                    <div 
                                    key={`kkpkj3g9u3${i}`}
                                    className={`circle rounded-full blur-2xl ${colors[i]} absolute ${ry}-${pos[i].top} ${rx}-${pos[i].left}  ${size} h-20`}></div>
                                )
                            })}
                        </div>
                        <div className="message text-white z-10 text-[50%] sm:text-[80%] md:text-[100%] ">{text}</div>
                        {time && <div className="time text-end text-[.6rem] text-[50%] sm:text-[80%] md:text-[100%] text-white/60 uppercase">{time}</div>}
                        <motion.div 
                        animate={status && hovered?{height: [0, `fit-content`], opacity: 1}:{height: [`fit-content`, 0], opacity:0}}
                        className="time text-end text-[.6rem] text-[50%] sm:text-[80%] md:text-[100%] text-white/60 capitalize flex items-center gap-2">{<Send size={10}/>}{status}</motion.div>
                    </div>
                    <div className="icon"> 
                        <div className="name rounded-full text-[50%] sm:text-[80%] md:text-[100%] bg-white/20 text-white p-2 w-8 h-8 flex items-center justify-center capitalize">{by.toLocaleLowerCase()}</div>
                    </div>
                            
                </motion.div>
        </div>
    )
}
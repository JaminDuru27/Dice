import { motion } from "framer-motion"
import { BellIcon, XCircle } from "lucide-react"

export function Feedback({message}){
    return (
        <motion.div 
        animate={message?{opacity: [0, 1], translateY: [0,20],  }:{opacity: 0, translateY: 20}}
        transition={{duration: 0.5}}
        className="w-fit h-fit flex-col gap-2 bg-blue-500 absolute  top-5 left-1/2 translate-x-[-50%] backdrop-blur-2xl p-2 text-center text-[.8rem] rounded-2xl text-white geoform flex items-center justify-center">
            <motion.div className="bell bottom-2 right-2 text-black/40">
            {message?.type === `info` && <BellIcon size={16} />}
            {message?.type === `error` && <XCircle size={16} className="text-red-500" />}
            </motion.div>
            <motion.div 
            animate={message?.message?{width: [`0%`, `fit-content`],height: [`0%`, `fit-content`], opacity: [0, 1]}:{opacity: 0, width: [`fit-content`,`0%`], height: [`fit-content`,`0%`]}}
            transition={{duration: 0.5, delay: 0.5}}
            className="w-0 h-0 overflow-hidden">
                {message?.message}
            </motion.div>  
        </motion.div>
    )
}
import { animate, motion } from "framer-motion"
import { Dice3 } from "lucide-react"
import { Dices } from "./Dices"

export function Loading(){
    return (
        <motion.div className="flex justify-center z-50 items-center w-full h-screen absolute top-0 left-0 bg-black">
            <div className="flex text-[.8rem] items-center gap-2 capitalize text-white">
                <div className="loading">Loading</div>
                <Dices/>
            </div>
        </motion.div>        
   )
}
import { animate, motion } from "framer-motion"
import { Dice3 } from "lucide-react"

export function Loading(){
    return (
        <motion.div className="flex justify-center z-50 items-center w-full h-screen absolute top-0 left-0 bg-black">
            <div className="flex text-[.8rem] items-center gap-2 capitalize text-white">
                <div className="loading">Loading</div>
                <div className="dices flex items-center gap-1">
                    
                    {[`1`, `2`, `3`].map((i, k)=>{
                        return (
                            <motion.div 
                            key={k+ `03000030003jjjdi`}
                            animate ={
                                {
                                    translateY: [0, 10, -10, 0],
                                    rotate: 360,
                                }
                            }
                            transition={{duration: 0.4, delay : (k * 0.1), repeat: Infinity, ease: `linear`}}
                            className="dice"><Dice3 size={13}/></motion.div>
                        )
                    })}
                </div>
            </div>
        </motion.div>        
   )
}
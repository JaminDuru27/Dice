import { motion } from "framer-motion"
import { Dice3 } from "lucide-react"

export function Dices(){
    return (
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
    )
}
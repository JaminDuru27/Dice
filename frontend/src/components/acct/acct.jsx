import { motion } from "framer-motion"
import { Badge, Dice3, Star } from "lucide-react"

export function Acct({openAcct, setOpenAcct}){
    return (
        <motion.div 
        animate={openAcct?{display:`block`, opacity: [0, 1]}:{display:`none`, opacity: [1, 0]}}
        className="absolute top-20 z-20 text-white w-[70%] sm-w-[1/2] right-5 border-2 border-white/70 shadow-2xl bg-gradient-to-l from-blue-500 to-indigo-700 to-blue-700 rounded-2xl p-2 ">
            <div className="p w-full flex flex-col  justify-center items-center gap-2">
                {<Dice3 size={70} color="#313198"/>}
                <div className="name capitalize">Don Simon</div>
            </div>
            <div className="options flex gap-2 flex-col justify-center items-center my-2">
                <div className="swi capitalize rounded-2xl  text-[.7rem] cursor-pointer bg-white/20 w-fit p-2 border border-black/40 ">switch account</div>
                <div className="swi capitalize rounded-2xl  text-[.7rem] cursor-pointer bg-white/20 w-fit p-2 border border-black/40 ">Log Out</div>
            </div>
            <div className="bades">
                <div className="badges capitalize">badges</div>
                <div className="badges flex overflow-x-auto scrollx gap-2  border-2 p-2 border-white/20 rounded-2xl">
                    <div className="consistency flex shrink-0 text-[.8rem] flex gap-2 text-amber-400 border border-amber-400 bg-amber-500/20 p-2 rounded-2xl  justify-between items-center">
                        {<Badge/>}Consistency
                    </div>
                </div>
            </div>
            <div className=" my-4 text-[.8rem] capitalize ">
                <div className="title mb-4">you are very</div>
                <div className=" flex shrink-0 mb-2 items-center justify-center gap-2 text-amber-400">{<Star/>}  <div className="text-white">Very Consistent</div></div>
                <div className=" flex shrink-0 mb-2 items-center justify-center gap-2 text-amber-400">{<Star/>}  <div className="text-white">Very Consistent</div></div>
                <div className=" flex shrink-0 mb-2 items-center justify-center gap-2 text-amber-400">{<Star/>}  <div className="text-white">Very Consistent</div></div>
                <div className=" flex shrink-0 mb-2 items-center justify-center gap-2 text-amber-400">{<Star/>}  <div className="text-white">Very Consistent</div></div>
            </div>
        </motion.div>
    )
}
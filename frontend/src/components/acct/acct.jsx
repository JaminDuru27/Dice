import { motion } from "framer-motion"
import { Badge, Dice3, Star } from "lucide-react"

export function Acct({openAcct,profile, setOpenAcct}){
    console.log(profile)
    return (
        <motion.div 
        animate={openAcct?{display:`block`, opacity: [0, 1]}:{display:`none`, opacity: [1, 0]}}
        style={{boxShadow: `2px 2px 24px -7px black`, display:`none`}}
        className="
        bg-gradient-to-l from-blue-500/40 to-indigo-700/40 to-blue-700/40 opacity-0 backdrop-blur-2xl 
        fixed top-20 z-20 text-white w-[60%] sm:w-[1/2] text-[.5rem] sm:text-[.7rem] md:text-[.8rem] sm:w-[50%] md:w-[20%] right-5 border border-white/20 shadow-2xl  rounded-2xl p-2 ">
            <div className="p w-full flex flex-col  justify-center items-center gap-2">
                {<Dice3 size={70} color="#313198"/>}
                <div className="name capitalize">{profile?.username}</div>
            </div>
            <div className="options flex gap-2 flex-col justify-center items-center my-2">
                <div className="swi capitalize rounded-2xl cursor-pointer bg-white/20 w-fit p-2 border border-black/40 ">switch account</div>
                <div className="swi capitalize rounded-2xl cursor-pointer bg-white/20 w-fit p-2 border border-black/40 ">Log Out</div>
            </div>
            <div className="bades">
                {profile?.badges?.length ? (
                    <div className="badges mb-2 capitalize">badges</div>
                ):null}
                {profile?.badges.length ? (
                    <div className="badges flex overflow-x-auto scrollx gap-2  border-2 p-2 border-white/20 rounded-2xl">
                    {(profile?.badges || []).map((b, k)=>{
                        return (
                            <div 
                            key={`882g772n~je73[$}%#}${k}]`}
                            className="consistency flex shrink-0  flex gap-2 text-amber-400 border border-amber-400 bg-amber-500/20 p-2 rounded-2xl  justify-between items-center">
                                {<Badge/>}{b?.name || b}
                            </div>
                        )
                    })}
                </div>
                ):null}
            </div>
            <div className=" my-4 capitalize ">
                {profile?.remarks?.length ? (
                    <div className="title mb-4">you are very</div>
                ):null}

                {(profile?.remarks || []).map((b, k)=>{
                    return (
                        <div key={`99266626628${l}#{${k}`} className=" flex shrink-0 mb-2 items-center justify-center gap-2 text-amber-400">{<Star/>}  <div className="text-white">{b?.text || b}</div></div>
                    )
                })}
            </div>
        </motion.div>
    )
}
import { motion } from "framer-motion"
import { messageoptions } from "../utils/messageoptions"
import { groupoptions } from "../utils/groupOptions"
import { chatoptions } from "../utils/contactOptions"
import { useRef } from "react"
import { XIcon } from "lucide-react"

export function ContextMenu({options ={list:[], dir:`left`}, setOptions, ref}){
    let x = ()=>0+`px`
    let y = ()=>0+`px`
    const ofx = (options?.offx|| 0);
    const ofy = (options?.offy|| 0);
    const bref= useRef(null)
    if(options?.dir === `right`){
        const b = ref[`current`].getBoundingClientRect()
        const b2 = bref[`current`]?.getBoundingClientRect()

        x = ()=>b.x - b2.width-10 + ofx + `px`
        y = ()=>b.y + ofy +  `px`
    }
    if(options?.dir === `left`){
        const b = ref[`current`].getBoundingClientRect()
        const b2 = bref[`current`]?.getBoundingClientRect()
        x = ()=>b.x + b.width +10 +  options?.ofy  + `px`
        y = ()=>b.y + ofy+`px`
    }
    
    return (
        <motion.div 
        ref={bref}
        style={{
            top:`${y()}`,
            left:`${x()}`,
        }}
        animate={options?.list?.length?{opacity: 1, display: `block`}:{opacity: 0, display: `none`}}
        className="absolute top-0 left-0 text-white z-60 p-2 backdrop-blur-2xl rounded-2xl bg-black/20 border border-white/20 rounded-sm ">
            <div 
            onClick={()=>{setOptions(null)}}
            className="ei absolute top-0 left-0 translate-x-[-100%] p-2 cursor-oointer"
            >{<XIcon size={20}/>}</div>
            { 
                (options?.list || []).map((op, k)=>{
                    const Icon = op.icon
                    return (
                        <motion.div 
                        whileHover={{background: `rgba(225, 225, 225, 0.2)`}}
                        animate={{}}
                        key={`92--2-055-05998530jfhdw${k}`}
                        onClick={()=>{op.cb();setOptions(null)}}
                        className={`flex cursor-pointer rounded-sm text-${op.color?op.color:`white`} items-center justify-between gap-4 text-[.8rem] p-2`}
                        >
                            <Icon size={12}/>
                            <div className="capitalize  ">{op.title}</div>
                        </motion.div>
                    )
                })
            }
        </motion.div>
    )
}
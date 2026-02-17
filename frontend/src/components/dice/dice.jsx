import { motion } from "framer-motion";
import { Dice2, Dice4, Dice5, Dice6, Dice6Icon, DicesIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
export function Dice({setMessage, cb = ()=>{}}){
    const [list, setlist]= useState([])
    const addtolist = ()=>{
        const v = {name:``, priority: 0}
        setlist(p=>[...p, v])
    }
    const time = useRef(null)
    const [result, setresult] = useState(undefined)
    const randomIndex = ()=>{
        return Math.floor(Math.random() * list.length)
    }
    const [roll, setroll]= useState(false)
    return (
        <div className="w-[50vw] h-full overflow-hidden flex justify-center flex-col  gap-2 items-center absolute top-1/2 left-1/2 translate-[-50%]">
            {result && !list?.length  && (
                <motion.div 
                animate={{opacity: [0, 1, 1, 0], translateY: [10 ,0], }}
                transition={{duration:4}}
                className="bg-gradient-to-l from-blue-500 to-indigo-700 p-2 text-white px-4 capitalize text-[1.2rem] rounded-2xl outline-2 outline-indigo-700 outline-offset-2">{`${result?.name}`}</motion.div>
            ) 
            }
            <div className="lists relative  flex rounded-2xl items-center justify-center gap-2 flex-wrap max-w-[80vw] p-2">
                {(list || []).map((item, k)=>{
                    return (
                        <motion.div 
                        animates={{opacity: [0, 1] , translateY: [200, 0]}}
                        transition={{duration: 0.5}}
                        key={`kdk93j9dhd9${k}`}
                        onInput={(e)=>{
                            setlist(p=>p.map((i, ki)=>ki===k?{...i, name:e.target.value}:i  ))
                        }}
                        className="item  min-w-20 shrink-0  w-26  h-8 flex items-center gap-1 text-[.7rem] relative">
                            <input 
                            autoFocus={true}
                            type="text" value={item.name} className="input capitalize bg-white  p-2 rounded-2xl w-full h-full" />
                            <div 
                            onClick={()=>{
                                setlist(p=>p.filter((i,ki)=>ki !== k))
                            }}
                            className="exit absolute top-1/2 right-2 translate-y-[-50%] cursor-pointer">{<XIcon size={12} />}</div>
                            {/* <div className="priority  flex justify-center items-center w-5 h-8 bg-white rounded-2xl p-2">{item.priority}</div> */}
                        </motion.div>
                    )
                })}
            </div>
            <motion.div 
            animate={(roll)?{rotate: [`0deg`, `360deg`]}:{}}
            onClick={()=>{
                if(list.length>=6) {setMessage({message:`You can only have 6 items`, type:`error`}); return}
                clearTimeout(time[`current`])
                addtolist()
                setresult(undefined)
            }}
            
            className="dice cursor-pointer">
                {<Dice5 size={70} color={`#b732b3   `}/>}
            </motion.div>
            <motion.div 
            animate={list.length && result === undefined ?{scale: [1, 1.2, 1], display: `flex`}:{opacity: 0, display: `none`}}
            onClick={()=>{
                const valid = list.every(i=>i.name.trim() !== "")
                if(!valid) {setMessage({message:`Please fill in all item names`, type:`error`}); return}
                setroll(true)
            
                time[`current`] = setTimeout(()=>{
                    setroll(false)
                    const index = randomIndex()
                    setresult((list[index]))
                    cb(list[index || 0])
                    setlist([])
                }, 5000)
            }}
            style={{display: `none`}}
            className="add flex rounded-[2rem] outline-red-500 outline-2 outline-offset-2  cursor-pointer bg-pink-700 p-2 px-4">Roll {<DicesIcon/>}
            </motion.div>
        </div>
    )
}
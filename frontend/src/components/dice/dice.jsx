import { motion } from "framer-motion";
import { Dice2, Dice4, Dice5, Dice6, Dice6Icon, DicesIcon, SmileIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { AddProject } from "../../utils/addProject";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function Dice({setMessage, cb = ()=>{}}){
    const nav = useNavigate()
    const [list, setlist]= useState([])
    const [priority, setPriority]= useState(1)
    const [roll, setroll]= useState(false)
    const [result, setresult] = useState(undefined)
    const time = useRef(null)

    
    const randomIndex = ()=>{
        return Math.floor(Math.random() * list.length)
    }
    const addtolist = ()=>{
        const v = {name:``, priority: 0}
        setlist(p=>[...p, v])
    }

    const addnewproject = async ({name, priority, id})=>{
        const res = AddProject(setMessage,{name: name, projectId: id}, 'projects', 'push')
        .then(project=>{
            if(project.success){
                nav(`/todo?name=${name} &id=${id}`)
            }
        })
        const data = await res
        return data.data
    }
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: addnewproject, 
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: [`profile`]})
        }
    })

    return (
        <>
            <div className="mood text-white sm:w-12 sm: h-12 md:w-15 md: h-15 absolute top-24 translate-x-[-50%] left-1/2">{<SmileIcon className="w-full h-full"/>}</div>

        <div className="w-[50vw] h-full overflow-hidden flex justify-center flex-col  gap-2 items-center absolute top-1/2 left-1/2 translate-[-50%]">
            {result && !list?.length  && (
                <motion.div 
                animate={{opacity: [0, 1, 1, 0], translateY: [10 ,0], }}
                transition={{duration:4, repeat: Infinity, ease: `linear`}}
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
                            <select 
                            value={item.priority}
                            onInput={(e)=>{
                                const v = Number(e.target.value)
                                console.log(v)
                                item.priority = v

                            }}
                            name="" className="text-white border-1 border-white/10 p-1 rounded-lg" id="">
                                {[1,2,3,4,5,6].map((e, k)=>{
                                    return (
                                        <option key={`k01j9j99nfyfgp$${k}`} className="text-black" value={e}>{e}</option>
                                    )
                                })}
                            </select>
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
            transition={{repeat: Infinity, duration: 2, ease: `linear`}}
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
                    const id  = Math.random().toString(36).substring(2, 9)
                    mutate({id, name: list[index].name, priority: list[index].priority})


                    setresult((list[index]))
                    cb(list[index || 0])
                    setlist([])
                }, 5000)
            }}
            style={{display: `none`}}
            className="add flex rounded-[2rem] outline-red-500 outline-2 outline-offset-2  cursor-pointer bg-pink-700 p-2 px-4">Roll {<DicesIcon/>}
            </motion.div>
 
        </div>
        </>
    )
}
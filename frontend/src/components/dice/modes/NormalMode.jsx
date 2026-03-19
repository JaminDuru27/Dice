import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Dice2, Dice4, Dice5, Dice6, Dice6Icon, DicesIcon, Link2, SmileIcon, XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AddProject } from "../../../utils/addProject";
import { useEffect, useRef, useState } from "react";
import { specialId } from "../../sidebar/groups/groups";
export function NormalMode({mode, setMessage}){
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
    const nav = useNavigate()
    const [list, setlist]= useState([])
    const randomIndex = ()=>{
        return Math.floor(Math.random() * list.length)
    }
    const addtolist = ()=>{
        const v = {name:``, priority: 0}
        setlist(p=>[...p, v])
    }
    const [priority, setPriority]= useState(1)
    const [roll, setroll]= useState(false)
    const [result, setresult] = useState(undefined)
    const time = useRef(null)
    return (
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
                            <motion.select 
                            animate={mode === `normal`?{opacity: 1, display:`block`}:{opacity:0,display:`none`}}
                            value={item.priority}
                            onInput={(e)=>{
                                const v = Number(e.target.value)
                                const temp = {...item, priority:v}
                                const l = list.filter(i=>i !== item)
                                setlist(p=>([...l.map(e=>e), temp]))

                            }}
                            name="" className="text-white border-1 border-white/10 p-1 rounded-lg" id="">
                                {[1,2,3,4,5,6].map((e, k)=>{
                                    return (
                                        <option key={`k01j9j99nfyfgp$${k}`} className="text-black" value={e}>{e}</option>
                                    )
                                })}
                            </motion.select>
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
            animate={mode === `group`?{opacity:0,display:`none`}:list.length && result === undefined ?{scale: [1, 1.2, 1], display: `flex`}:{opacity: 0, display: `none`}}
            onClick={()=>{
                const valid = list.every(i=>i.name.trim() !== "")
                if(!valid) {setMessage({message:`Please fill in all item names`, type:`error`}); return}
                setroll(true)
            
                time[`current`] = setTimeout(()=>{
                    setroll(false)
                    const index = randomIndex(mode)
                    const id  = Math.random().toString(36).substring(2, 9)
                    mutate({id, name: list[index].name, priority: list[index].priority})


                    setresult((list[index]))
                    cb(list[index || 0])
                    setlist([])
                }, 5000)
            }}
            style={{display: `none`}}
            className="add flex rounded-[2rem] outline-red-500 outline-2 outline-offset-2 items-center  cursor-pointer bg-pink-700 p-2 px-4">Roll {<DicesIcon/>}
            </motion.div>
            <motion.div 
            animate={mode === `group`?{opacity:1,display:`flex`}:list.length && result === undefined && mode === `group` ?{scale: [1, 1.2, 1], display: `flex`}:{opacity: 0, display: `none`}}
            onClick={()=>{
                const valid = list.every(i=>i.name.trim() !== "")
                if(!valid) {setMessage({message:`Please fill in all item names`, type:`error`}); return}
                let s = `${specialId}-DGM-`
                list.map(({name}, i)=>{
                    if(i === 0){s += name;return}
                    s+=`+${name}`
                })
                navigator.clipboard.writeText(s)
                setMessage({message:`copied link`})
            }}
            style={{display: `none`}}
            className="add flex rounded-[2rem] outline-blue-500 outline-2 outline-offset-2 items-center  cursor-pointer bg-blue-700 p-2 px-4"
            >Link {<Link2/>}
            </motion.div>
 
        </div>
    )
}
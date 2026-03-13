import { motion } from "framer-motion"
import { CheckCircle, CircleIcon, DeleteIcon } from "lucide-react"
import { useState } from "react"
import { Patch } from "../../utils/patch"
import { data } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export function ListItem({data,setRefresh, setMessage, name, projectid, listid,date, time, title, descr, completed, completedChange=()=>{}}){
    const [open, setopen] = useState(false)
    const [comp, setcomp] = useState(completed)
    const dateobj = new Date(date)
    const timeobj = new Date(time)
    const day = dateobj.toLocaleString('default', { weekday: 'long' });
    const month = dateobj.toLocaleString('default', { month: 'long' });
    const daynum = dateobj.getDate()
    const datestring = dateobj.toLocaleDateString()
    const timestring = timeobj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const queryClient = useQueryClient()
    const fn = async ()=>{
        try{
            const res = await Patch(setMessage, 
                {...data,completed: !comp}, 
                `projects.$[p].todos.$[t]`, `set`, [{'p.projectId': projectid}, {'t._id': listid}]).then(data=>{
                if(data.success){
                    setMessage({message: `Todo marked as ${!comp?`completed`:`incomplete`}`, type: `info`})
                }
            })
            const d = await res.json()
            return d.ok
        }catch(err){
            console.error(err)
        }        
    }
    const deletefn = async ()=>{
        try{
            const res = await Patch(setMessage, 
                ({_id:listid}), 
                `projects.$[p].todos`, `pull`, [{'p.projectId': projectid}]).then(data=>{
                if(data.success){
                    setMessage({message: `Todo marked as ${!comp?`completed`:`incomplete`}`, type: `info`})
                }
            })
            const d = await res.json()
            return d.ok
        }catch(err){
            console.error(err)
        }        
    }
    const mutation = useMutation({
        mutationFn: fn,
        onSuccess:()=>{
            queryClient.invalidateQueries([`todolist`])
        }
    })
    const deletemutation = useMutation({
        mutationFn: deletefn,
        onSuccess:()=>{
            queryClient.invalidateQueries([`todolist`])
        }
    })
    return (
        <motion.div 
        animate={{opacity:[0,1], translateY:[10, 0]}}
        transition = {{duration:1}}
        className="list p-2 border-white/60 relative border bg-white/10 gap-2 rounded-2xl flex p-4">
            
            <div className=" capitalize w-full">
                <div className="tile absolute top-0 translate-y-[-120%] left-2 text-[.6rem]  capitalize">
                    {timestring}, {month} {daynum}, {day}
                </div>
                <div className="title">{title}</div>
                <motion.div 
                onClick={()=>{setopen(p=>!p)}}
                animate={open?{height: `fit-content`}:{height:`1.5rem`}}
                className="descr overflow-hidden p-2 relative /80 mt-2  text-[.7rem]">
                <div className={`w-1 h-full  absolute left-[-2px] top-1/2 translate-y-[-50%] rounded-sm bg-white/50`}></div>    
                    {descr}
                </motion.div>
            </div>
            <motion.div 
            whileTap={{scale:.7}}
            onClick={()=>{
                mutation.mutate()

                setcomp(p=>!p)
                completedChange(!comp)
            }}
            className="check cursor-pointer h-fit ">
                {comp?<CheckCircle/>: <CircleIcon/>}
            </motion.div>
            <div 
            onClick={()=>{
                deletemutation.mutate()
            }}
            className="delete cursor-pointer h-fill self-center border-l-2 border-white/20 p-2 m-2 ">
                {<DeleteIcon/>}
            </div>
        </motion.div>
    )
}
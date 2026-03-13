import { motion } from "framer-motion";
import { CheckCircle, CheckCircle2Icon, Circle, CircleCheck, CircleIcon, Clock10, Dice2, Dice3, Dice4, Dice6, List, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { data, useSearchParams } from "react-router-dom";
import { GetProject } from "../../utils/getProject";
import { AddToList } from "./addtodo";
import { ListItem } from "./listitem";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function Todo({setMessage, profile}) {
    const [refresh, setRefresh] = useState(false)
    const [alert, setAlert] = useState(null)
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    const fn = async ()=>{
        try{
            const res = GetProject(id)
            const data = await res
            return data.project
        }catch(err){
            console.error(err)
        }
    }
    const {isLoading, error, data} = useQuery({
        queryFn: fn,
        queryKey: [`todolist`],
        staleTime: 5000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    if(isLoading)return <>Loading..</>
    if(error)return <>Error..</>
    const project = data
    const getPerc = ()=>{
        const p = 100/(project.todos.filter(e=>e.completed).length)
        return p===Infinity?0:p
    }
    const completed = (project)=>{
        return project.percentageCompletion >= 100
    }
    const getProject = ()=>project
        
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-start items-start">
            <Time getProject={getProject} setAlert={setAlert}/>
            <div 
            style={{
                backgroundImage: `linear-gradient(90deg, #08dcc6, #e73ae7)`,
                
                WebkitBackgroundClip:`text`,
                backgroundClip: `text`,
                color: `transparent`,
                WebkitTextFillColor: `transparent`
            }}
            className=" flex gap-2 justify-center items-center text-6xl font-bold text-white"> 
                {<Dice3 size={50}/>}</div>
            <div className="todo relative w-full h-full rounded-sm b p-4 flex flex-col gap-4">
                <div 
                style={{}}
                className={`${!completed(project)?`text-blue-600`:`text-amber-500`} flex items-center gap-2`}>Youre Almost There {<Clock10/>}</div>
                <div 
                className="bar w-full rounded-2xl border-2 border-white/20 relative overflow-visible">
                    <div className="bg-red  top-0 left-0 w-full z-10"></div>
                    <motion.div 
                    animate={{width: `${project.percentageCompletion}%`}}
                    transition={{duration: 1}}
                    style={{backgroundImage:`${!completed(project)?`linear-gradient(90deg, #08dcc6, #e73ae7)`:`linear-gradient(90deg, gold, yellow)`}`}}
                    className="lev  rounded-lg shadow-2xs h-2 bg-purple-700"></motion.div>
                </div>
                <div className={`list ${completed(project) ? `bg-amber-300/60 text-amber-200`:`text-white`}     border-1 border-white/20 relative shadow-2xl  w-full h-fit gap-8 rounded-lg b p-4  py-10 flex flex-col `}>
                    {
                        !completed(project) &&(
                            <div className="designs z-[-1] w-full h-full absolute overflow-hidden top-0 left-0 rounded-lg">
                                <div className="circle rounded-full w-90 h-190 bg-violet-700/20 blur-[160px] top-10 right-28 absolute"></div>
                                <div className="circle rounded-full w-190 h-90 bg-indigo-700/20 blur-[160px] absolute"></div>
                                <div className="circle rounded-full w-190 h-190 bg-cyan-700/20 blur-[160px] top-64 absolute"></div>
                            </div>
                        )
                    }
                    {project.todos.map((item, k)=>{
                        return (
                            <ListItem setRefresh={setRefresh} data={item} setMessage={setMessage} projectid={id} listid={item._id}  key={k} time={item.dueDate} date={item.dueDate} title={item.title} descr={item.description} completed={item.completed}/>
                        )  
                    })}
                    <AddToList profile={profile} name={name} id={project._id} onAdd={(data)=>{}} setMessage={setMessage}/>
                </div>
            </div>
        </div>
    )
}



export function Time({setAlert, getProject}){
    const [t, sett] = useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{
            const project = getProject()
            if(project){
                project.todos.forEach(todo=>{

                })
            }
            const date = new Date()

            let hours = date.getHours()
            const minutes = date.getMinutes()
            const ampm = hours >= 12 ? "AM" : "PM"

            hours = hours % 12
            hours = hours || 12
            const string = `${hours}:${minutes} ${ampm}`
            sett(string)
        },1000)
        return ()=>{clearInterval(interval)}
    },[])
    return (
        <div 
        style={{textShadow:`0px 0px 12px blue , 2px 3px 12px green`}}
        className="text-[#2f37ff] text-[3.2rem] text-center w-full mt-4 ">{t}</div>
    )
}

export function Alert({alert,setAlert}){
    return (
        <motion.div
        className="absolute top-1/2 left-1/2 z-20 bg-amber-400 translate-[-50%]"
        >
            kdkdo
        </motion.div>
    )
}
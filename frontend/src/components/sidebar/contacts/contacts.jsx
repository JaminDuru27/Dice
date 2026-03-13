import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Dice3, MessageCircleDashed, PlusIcon, Search, SearchIcon, Users2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Contacts({profile,setShowSearch, accessibility, setAccessibility}){
    const nav = useNavigate()

    const fn = async()=>{
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/getFriendsList`, {
                method:`GET`,
                headers:{
                    'Content-Type': `application/json`
                },
                credentials: `include`
            })
            const data = await res.json()
            console.log(`contacts`, data)
            return data.data
        }catch(err){console.error(err)}
    }
    const {data, isLoading, error} = useQuery({
        queryFn: fn,
        queryKey: [`contacts`],
        staleTime: 5000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    if(isLoading)return<>Loading...</>
    if(error)return<>Error...</>
    return (
        <div className="">
            <div className="title mb-2 flex w-full items-center justify-between">
                <div className="flex gap-2 ">
                    <div className="name capitalize">contacts</div>
                    {<Users2 size={20}/>}
                </div>
                
                <div 
                onClick={()=>{
                    setShowSearch(p=>true)
                }}
                className="search">
                    {<SearchIcon size={20} color={`black`}/>}
                </div>
            </div>
            <div 
            style={{boxShadow: `0px 0px 18px -8px black inset  `}}
            className="groups  flex gap-2  relative  p-2 rounded-2xl overflow-x-auto scrollx">
                <div 
                onClick={()=>{
                    setShowSearch(p=>true)
                }}
                className="group px-2 flex text-center   shrink-0 min-w-20 cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl  flex-row justify-center items-center gap-0"
                >
                    Add New Contact {<PlusIcon size={20}/>}

                </div>
                {(data || []).map((f, key)=>{
                    return (
                        <Contact key={key} name={f?.username || ``} cb={()=>{
                            nav(`/chat?type=1&ref=${f._id}`)
                        }}/>
                    )
                })}                
            </div>
        </div>
    )
}

export function Contact({key, name, cb}){
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div 
        animate={{opacity: [0, 1]}}
        transition={{delay: 0.1 * key}}
        key={`k13993gdnjoq;'[]${key}`}
        onClick={()=>{cb()}}
        onHoverStart={()=>{console.log("hovered"); setHovered(true)}}
            onHoverEnd={()=>{setHovered(false)}}
className="group px-2 shrink-0 min-w-30 cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl flex flex-col justify-center items-center">
            <div className="icon p-2 flex justify-center items-center bg-white/20 rounded-full mb-2 text-black/20">
                {<Dice3 size={30}/>}
            </div>
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis ">{name}</div>
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis opacity-[.7] ">#{name.split(' ')[0]}</div>
            <div 
            
            className="flex w-fit mt-2 flex items-center justify-end gap-2">
                <div 
                className=" w-fit h-6 p-1  rounded-full flex justify-center items-center bg-white/30">
                    <motion.div 
                    animate={(hovered)?{width: [0, `100%`]}:{width: [`100%`, 0]}}
                    className="w-100 capitalize text-[.5rem] overflow-hidden text-nowrap">talk with {name.split(' ')[0]}</motion.div>   
                {<MessageCircleDashed/>}</div>
            </div>
        </motion.div>
    )
}
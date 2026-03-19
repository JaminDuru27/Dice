import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Dice3, Link, MessageCircleDashed, PlusIcon, Search, SearchIcon, Users2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialId } from "../groups/groups";
export function Contacts({profile,setShowSearch, accessibility, setAccessibility, setMessage}){
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
                    console.log(f)
                    return (
                        <Contact key={key} name={f?.username || ``} cb={()=>{
                            nav(`/chat?type=1&ref=${f._id}`)
                        }} onlinkcopy={()=>{
                            navigator.clipboard.writeText(`${specialId}-DC-${f._id}`)
                            setMessage({message: `Copied Contact`, type:`info`})
                        }}/>
                    )
                })}                
            </div>
        </div>
    )
}

export function Contact({key, name, cb, setMessage, onlinkcopy}){
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div 
        animate={{opacity: [0, 1]}}
        transition={{delay: 0.1 * key}}
        key={`k13993gdnjoq;'[]${key}`}
        onHoverStart={()=>{console.log("hovered"); setHovered(true)}}
            onHoverEnd={()=>{setHovered(false)}}
className="group px-2 shrink-0 min-w-30  cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl flex flex-col justify-center items-center">
            
            <div 
            onClick={()=>{
                onlinkcopy()
            }}
            className="link absolute flex justify-center items-center p-1 rounded-full gap-2 top-1 right-1 bg-white/50 cursor-pointer w-6 h-6">{<Link className="w-fit h-fit"/>}</div>
            <div className="icon p-2 flex justify-center items-center bg-white/20 rounded-full mb-2 text-black/20">
                {<Dice3 className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10"/>}
            </div>
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis ">{name}</div>
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis opacity-[.7] ">#{name.split(' ')[0]}</div>
            <div 
            onClick={()=>{cb()}}
            className="flex w-fit mt-2 flex items-center justify-end gap-2">
                <div 
                className=" w-fit h-6 p-1  rounded-full flex justify-center items-center bg-white/30">
                    <motion.div 
                    animate={(hovered)?{width: [0, `100%`]}:{width: [`100%`, 0]}}
                    className="w-100 capitalize text-[.5rem] overflow-hidden text-nowrap">talk with {name.split(' ')[0]}</motion.div>   
                {<MessageCircleDashed className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10"/>}</div>
            </div>
        </motion.div>
    )
}
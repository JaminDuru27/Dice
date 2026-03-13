import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Dice3, DoorClosed, DoorOpen, SearchIcon, UserCog2Icon, UserMinus, UserMinus2, UserMinus2Icon, UserPlus2, UserX } from "lucide-react";
import { useState } from "react";
export function SearchContacts({showSearch, setShowSearch}){
    const [value, setValue] = useState(``)
    const [content, setContent] = useState([])
    const fn = async ()=>{
        try {
            const api = 'http://localhost:3000'
            const res= fetch(`${api}/api/users/getContacts?name=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include"
            }).then(res=>res.json()).then(data=>{
                setContent(data.users)
            })
            .catch(err=>{console.log(err)
            })
        }catch(err){
            console.error(err)
        }
    }
    
    return(
        <motion.div
        animate={showSearch?{opacity: [0, 1], translateY:[-50, 0], display:`flex`}:{opacity: [1, 0], translateY:[0, -50], display: `none`}}
        style={{display:`none`}}
        className=" p-2 bg-2 rounded-lg opacity-0 bg-black/20 border backdrop-blur-2xl border-white/20 w-[80%] h-[80%] fixed top-1/2 shadow-2xl left-1/2 flex flex-col gap-2 translate-y-[-50%] translate-x-[-50%]  z-50 ">
            <div className="flex items-center my-2 gap-8 ">
                <input value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="search contacts" className="w-full p-2 rounded-[2rem]  border border-white/20 bg-black/20 backdrop-blur-2xl text-white"/>
                <div 
                onClick={()=>{
                    fn()
                }}
                className="ser p-2 cursor-pointer flex justify-center items-center p-2 border border-white/20 rounded-full bg-black/20"><SearchIcon size={20} color={`white`}/></div>
                <div className="exit text-white cursor-pointer" onClick={()=>{setShowSearch(false)}}>{<DoorOpen/>}</div>
            </div>
            
            <div 
            style={{boxShadow: `0px 0px 18px -8px black inset  `}}
            className="content border-t relative overflow-y-auto scrolly border-white/20 rounded-2xl w-full h-full p-4"
            >
                {(content ||  []).map((user, key)=>{
                    return (
                        <Contact 
                        user={user}
                        key={key}  
                        />
                    )
                })}
            </div>
        
        
        </motion.div>
    )
}

export function Contact({name=`person`, cb=()=>{}, user,key, status = `blocked`}){
    const [spin, setSpin] = useState(false)
    return !user?<></>:(
        <motion.div 
        key={`ekdpkdpdcontact-${key}`}
        initial={{opacity:0, translateY:-50}}
        animate={{opacity: [0, 1], translateY:[-50, 0]}}
        transition={{duration: 1, delay:(key* 2)}}
        className="border text-white/30 shrink-0  border-white/20 flex justify-between items-center bg-black/20 backdrop-blur-2xl rounded-lg p-2 m-2">
            <div className="flex items-center gap-4 ">
                <div className="">
                    <div className="dice flex justify-center items-center bg-black.20 border-2  bg-white/10 border-white/20 rounded-full relative p-2">{<Dice3/>}</div>
                </div>
                <div className="flex flex-col">
                    <div className="name  capitalize ">{user.username}</div>
                    <div className="status text-[.7rem] capitalize opacity-[.7]">{user.status}</div>
                </div>
            </div>
            <div 
            style={{backgroundColor: user.status===`friend`?`rgba(0, 225, 0,0.2)`:user.status === `blocked`?`rgba(255, 0,0,0.2)`:`transparent`}}
            onClick={
                async ()=>{
                    setSpin(true)
                    const api = 'http://localhost:3000'
                    await fetch(`${api}/api/users/sendNotifications`,{
                        method: `POST`,
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            toId:user.id, 
                            message:`Friend Request`,
                            data:{
                                type: `Friend Request`,
                            }
                        }),
                        credentials:`include`
                    }).then(async(res)=>{
                        const d = await res.json() 
                        if(d.success){
                            setSpin(false)
                        }
                    }).catch((err)=>{console.error(err)})
                }
            }
            className="Request p-2 cursor-pointer relative flex justify-center items-center  rounded-full mr-2 bg-black/20">
                <motion.div 
                initial={{rotate:0}}
                animate={spin?{rotate: [0, 360]}:{}}
                transition={{duration: 1, repeat: Infinity, ease: `linear`}}
                className="cicecle w-full h-full absolute top-0 left-0 rounded-full outline-2 outline-offset-4  outline-dashed outline-white/20"></motion.div>
                {
                user.status ===  `friend` && (<UserMinus2Icon size={20}/>)}
                {user.status === `blocked` && (<UserX size={20}/>)}
                {user.status === `stranger` && (<UserPlus2 size={20}/>)}
            </div>
        </motion.div>
    )
}
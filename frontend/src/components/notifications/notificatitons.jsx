import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Dice3, InboxIcon, Mail, MessageCircle, MessageSquareDashed, MessageSquareHeart, MessageSquareQuoteIcon, NotebookIcon, Trash2, User2Icon } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { socket } from "../../App"


export function Notifications({setMessage,profile,openNotification, setOpenNotification }){
    const queryClient = useQueryClient()

    useEffect(() => {
        socket.on("sentNotification", (notification) => {
            queryClient.invalidateQueries([`notification`, `profile`])
        })

        return () => {
            socket.off("sentNotification")
        }
    }, [])

    const fetchNots = async()=>{
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/getNotifications`, {
                method:`GET`,
                headers:{
                    'Content-Type': `application/json`
                },
                credentials: `include`
            })
            const data = await res.json()
            return data.data
        }catch(err){console.error(err)}
    }
    const changeNotifications= async(op, id)=>{
        const api =   `http://localhost:3000`
        const res = await fetch(`${api}/api/users/notificationOp?operation=${op}&id=${id}`, {
            method:`PATCH`,
            headers:{
                'Content-Type': `application/json`
            },
            credentials: `include`
        })
        const data = await res.json()
        if(data.success){
            queryClient.invalidateQueries(['notification'])
        }else{
            console.error(data?.message)
        }
    }
    const AddContact = async(id, notid)=>{
        const api =   `http://localhost:3000`
        const res = await fetch(`${api}/api/users/addContact`, {
            method:`PATCH`,
            headers:{
                'Content-Type': `application/json`
            },
            body: JSON.stringify({id}),
            credentials: `include`
        })
        const data = await res.json()
        if(data.success){
            setMessage({type:`success`, message:data.message})
            changeNotifications(`DELETE`, notid)
        }else{
            console.error(data?.message)
        }
    } 

    const mutation = useMutation({
        mutationFn: AddContact,
        onSuccess: (data)=>{
            queryClient.invalidateQueries(['notification', 'profile', 'contacts'])
        }
    })

    const {isLoading, data, error} = useQuery({
        queryKey: ['notification'],
        queryFn: fetchNots,
        staleTime: 5000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const notifications = data
    if(isLoading)return <>Loading/..</>
    if(error)return <>Error</>
    return  (
        <motion.div
        animate={openNotification?{display:`block`, opacity: [0, 1]}:{display:`none`, opacity: [1, 0]}}
        className="notificatiosn text-white overflow-x-hidden  absolute top-20 right-5 bg-black/20 border border-white/20 w-[60%] p-2 rounded-sm sm:w-[1/2] text-[.5rem] sm:text-[.7rem] md:text-[.8rem] sm:w-[50%] md:w-[20%]  z-20">
            <div className="name flex items-center gap-2">Notifications {<Mail size={16}/>} </div>
            <div className="content w-full max-h-[40vh] scrolly relative mt-2 p-2 overflow-x-hidden flex overflow-y-auto scrolly flex-col gap-2 ">
                {
                    (notifications || []).map((not,k)=>{
                        const text = not.message
                        const from = not?.from?.username || not.from._id
                        const isread = not?.isRead || false
                        const type = not?.data?.type || `Dice`
                        return (
                            <Not 
                            k={k}
                            ondelete={async()=>{
                                changeNotifications(`DELETE`, not._id)
                            }} 
                            markasread={()=>{
                                console.log(not)
                                changeNotifications(`MARKASREAD`, not._id)
                            }} 
                            onaccept= {()=>{
                                mutation.mutate(not.from, not._id)
                            }} 
                            ondecline= {()=>{
                                changeNotifications(`DELETE`, not._id)
                            }} 
                            date={not?.createdAt}
                            text={text} 
                            isread={isread} 
                            from={from} 
                            type={type}
                            />
                        )
                    })
                }
            </div>
        </motion.div>
    )
}
export function Not({from,k,date, text,isread = false, ondelete, onaccept,ondecline,markasread, type = `Friend Request`}){
    const [full, setFull] = useState(false)
    const [read, setread] = useState(false)
    const key = k
    const d = new Date(date)
    const month = d.toLocaleString('default', { month: 'long' });
    const day = d.getDate()
    const year = d.getFullYear()
    return (
        <motion.div
        key={`90he888e2525552v666$Pjfw{%%${key}`}
        initial={{translateY: -10}}
        animate={{opacity: [0, 1], translateY: [-10, 0]}} 
        transition={{duration: .8, delay: 1 * key}}
        className="w-full p-2  flex relative items-center gap-2  border border-white/10 relative rounded-sm bg-black/10 backdrop-blur-2xl">
            <motion.div 
            animate={isread?{width: 0, height: 0, display: `none`}:{display: `flex`}}
            transition={{duration:.3}}
            className="notread w-2 h-2 rounded-full bg-green-400 blur-[2px] absolute top-1 left-1"></motion.div>
            <div 
            onClick={()=>{
                setFull(false)
                ondelete()
            }}
            className="delete border border-white/20 cursor-pointer top-0 right-0 absolute bg-black/20 p-2 flex justify-center items-center rounded-2xl backdrop-blur-2xl translate-x-[50%] translate-y-[-50%]">{<Trash2 size={12}/>}</div>
            
            <div className="dice">
                {type === `Dice` && <Dice3/>}
                {type === `Friend Request` && <User2Icon/>}
            </div>
            <div className="flex w-[80%] overflow-hidden justify-center flex-col">
                <div 
                onClick={()=>{
                    setFull(p=>!p)
                    if(!full){
                        markasread(true)
                    }
                }}
                className="text-[.6rem]  cursor-pointer  text-nowrap capitalize"> from {from}</div>
                <motion.div 
                initial={{height:`10px`}}
                animate={full?{height: `100%`}:{height:`10px`}}
                className="tes text-[.6rem] overflow-hidden border-t border-white/10 pt-2 my-2 ">
                    <div className="word ">{type === `Friend Request`?
                    `${from} sends you a frend request. Accept Or Reject`
                    :text}</div>

                    {type === `Friend Request` && (
                    <div className="flex mt-2 justify-center items-center flex-wrap gap-2 text-[.7rem]">
                        <div onClick={()=>{setFull(false);onaccept()}} className="accept bg-white/10 border-2 cursor-pointer border-white/10 p-2 rounded-sm">Accept</div>
                        <div onClick={()=>{setFull(false);ondecline()}}className="reject bg-black/10 border-2 cursor-pointer border-white/10 p-2 rounded-sm">Reject</div>
                    </div>
                    )}
                    
                </motion.div>
                    <div className="text-[.5rem] flex  justify-between items-center capitalize text-white/80">
                        <div className="">{isread?`Read`:`Not Read`}</div>
                        <div className="">{day} {month} {year}</div>
                    </div>
            </div>
        </motion.div>
    )
}
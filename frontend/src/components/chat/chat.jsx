import { motion } from "framer-motion";
import { Dice3, DoorClosedIcon, DoorOpenIcon, DropletsIcon, Keyboard, Plus, Send, Smile} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MyLog } from "./mylog";
import { Log } from "./log";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { socket } from "../../App";
// import EmojiPicker from 'emoji-picker-react'
import emojisdata from "@emoji-mart/data"
import { Input } from "./input";
import { EmojiMin } from "./emojiPicker/emojiReact";
export function Chat(){
    const nav = useNavigate()
    const [query] = useSearchParams()
    const type  = query.get('type')
    const ref  = query.get('ref')
    const [showEmoji, setShowEmoji] = useState(false)
    const [emojiPicker,setEmojiPicker] = useState(false)
    useEffect(()=>{
        socket.on(`update-chat`,()=>{
            queryclient.invalidateQueries([`chat`])
        })
        return ()=>{socket.off(`update-${ref}-chat`)}
        
    },[])
    const fn = async()=>{
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/getConversations?id=${ref}&type=${type}`, {
                method:`GET`,
                headers:{
                    'Content-Type': `application/json`
                },
                credentials: `include`
            })
            const data = await res.json()
            return data 
        }catch(err){console.error(err)}
    }
    const {isLoading, error, data} = useQuery({
        queryKey:[`chat`],
        queryFn: fn,
        staleTime: 5000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    
    const mfn = async (message, convoId)=>{
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/updateConversation`, {
                method:`PATCH`,
                headers:{
                    'Content-Type': `application/json`
                },
                body:JSON.stringify({
                    id:ref,
                    type,
                    message,
                    reactions: [],
                }),
                credentials: `include`
            })
            const data = await res.json()
            return data.data
        }catch(err){console.error(err)}
    }
    const queryclient = useQueryClient()
    const ssenfn = async (id)=>{
        try{
            const ddd = `seen`
            const convoId = data.data._id
            const location = `list.$[l].status`
            const type = `set`
            const arrayFilters = [{'l._id':id}]
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/Convo`, {
                method:`PATCH`,
                headers:{
                    'Content-Type': `application/json`
                },
                body:JSON.stringify({data:ddd, convoId, location, type, arrayFilters}),
                credentials: `include`
            })
            const d = await res.json()
            return d.data
        }catch(err){console.error(err)}
    }
    const reactfn = async ({id, e})=>{
        try{
            const ddd =  {emoji:e, from: data.userId}
            const convoId = data.data._id
            const location = `list.$[l].reactions`
            const type = `push`
            const arrayFilters = [{'l._id':id}]
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/Convo`, {
                method:`PATCH`,
                headers:{
                    'Content-Type': `application/json`
                },
                body:JSON.stringify({data:ddd, convoId, location, type, arrayFilters}),
                credentials: `include`
            })
            const d = await res.json()
            return d.data
        }catch(err){console.error(err)}
    }
    const convomutation = useMutation({
        mutationFn: mfn,
        onSuccess: ()=>{
            queryclient.invalidateQueries([`chat`])
        }
    })
    const seenMutation = useMutation({
        mutationFn: ssenfn,
        onSuccess: ()=>{
            queryclient.invalidateQueries([`chat`])
        }
    })
    const reactMutation = useMutation({
        mutationFn: reactfn,
        onSuccess: ()=>{
            queryclient.invalidateQueries([`chat`])
        }
    })
    const textref = useRef(null)
    if(isLoading)return <>Loading/..</>
    if(error)return <>Error</>
    const min  = [`joy`, `blush`, `innocent`, `yum`, `zanny-face`,`100`, `smirk`, `unamused`, `relieved`,`pensive`,`sleeping`,`exploding_head`]
    return (
        <>
        {
            showEmoji &&
        <EmojiMin show={showEmoji} ref={textref} setShow={setShowEmoji} list={min} />

        }
        <div
        onClick={()=>{
            nav(`/`)
        }}
        className="exit text-white p-2   absolute top-0 left-0 sm:top-2 sm:left-2 md:top-4 md:left-4  justify-center items-center w-6 h-6">
            {<DoorOpenIcon size={18}/>}
        </div>
        <div className="rounded-4xl text-[60%] sm:text-[80%] md:text-[100%] bg-white/20 text-white flex justify-between items-center p-2 w-[80%] h-fit  top-4 left-1/2 translate-x-[-50%] fixed gap-4"
        >
            <div className="flex items-center gap-2">
                <div className="icon">{<Dice3/>}</div>
                {console.log(data)}
            <div className="capitalize">{data?.refData?.username || data?.refData?.name}</div>
            </div>

            <div className="">{<DropletsIcon/>}</div>
        </div>
        {console.log(data, `okoko`)}
        <div className="log w-full flex flex-col overflow-x-hidden overflow-y-auto scrolly gap-6 h-full text-white  p-2">
            {(data?.data?.list || []).map((convo, k)=>{
                const date = new Date(convo.date)
                const time = date.toLocaleTimeString()
                const name = convo?.sentBy.username[0]
                const isMe = ()=>convo.sentBy._id === data.userId

                // if(pre === `DT`){//todo}
                return isMe()?
                    <MyLog  
                    onReactPress={(e)=>{
                        setEmojiPicker({cb:(e)=>{
                            reactMutation.mutate({id:convo._id, e})
                        }})
                    }}
                    reactions={convo.reactions}
                    by={name} text={convo.message} time={time} 
                    key={k} onSeen={()=>{}} status={convo?.status}
                    />

                :(
                    <Log
                    type={type}
                    onReactPress={(e)=>{
                        setEmojiPicker({cb:(e)=>{
                            reactMutation.mutate({id:convo._id, e})
                        }})
                    }}
                    reactions={convo.reactions}
                    by={name} text={convo.message} time={time} key={k} onSeen={()=>{
                        seenMutation.mutate(convo._id)
                    }} status={convo?.status}/>
                )
            })}
        </div>
        <Input
        emojiPicker={emojiPicker}
        setEmojiPicker={setEmojiPicker}
        onSend= {(message)=>{
            convomutation.mutate(message, ref,)
        }}
        />

        </>
    )
}






import { motion } from "framer-motion";
import { ConeIcon, Dice3, DoorClosedIcon, DoorOpenIcon, DotIcon, DotSquare, DropletsIcon, Keyboard, LucideMenu, MenuSquare, PersonStanding, Plus, Send, Smile, UserCircle, XIcon} from "lucide-react";
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
import { Dices } from "../../loading/Dices";
import { q } from "./utils/queries";
import { ContextMenu } from "./contextMenu/contextMenu";
import { messageoptions } from "./utils/messageoptions";
import { groupoptions } from "./utils/groupOptions";
import { chatoptions } from "./utils/contactOptions";
import { isContactLink, isGroupLink, isVoteTodoLink } from "./utils/linkvalidators";
export function Chat({setMessage}){
    const nav = useNavigate()
    const [query] = useSearchParams()
    const type  = query.get('type')
    const ref  = query.get('ref')
    const [showEmoji, setShowEmoji] = useState(false)
    const [emojiPicker,setEmojiPicker] = useState(false)
    const {
    convomutation, isLoading, addFriendMutation, joinGroupMutation,
    reactMutation, jGFn, seenMutation, reactfn, ssenfn, fn, mfn, 
    queryclient, error,data, voteMutation} 
    = q(ref, type, setMessage)
    useEffect(()=>{
        socket.on(`update-chat`,()=>{
            queryclient.invalidateQueries([`chat`])
        })
        return ()=>{socket.off(`update-${ref}-chat`)}
        
    },[])
    const textref = useRef(null)
    const [c, setc]  = useState(false)
    const [options, setOptions]  = useState(null)
    const chatref = useRef(null)
    if(isLoading)return <>Loading/..</>
    if(error)return <>Error</>
    const min  = [`joy`, `blush`, `innocent`, `yum`, `zanny-face`,`100`, `smirk`, `unamused`, `relieved`,`pensive`,`sleeping`,`exploding_head`]
    return (
        <>
        {!data.isMember && data.isMember!== undefined && Number(type) === 2 && (
            //Group
            <JoinMember data={data} setc={setc} c={c} joinGroupMutation={joinGroupMutation}/>
        )}
        {!data.isFriend && data.isFriend !== undefined && Number(type) === 1 && (
            //Friend
            <AddFriend data={data} addFriendMutation={addFriendMutation}/>
        )}
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
            <div className="capitalize">{data?.refData?.username || data?.refData?.name}</div>
            </div>

            <div 
            onClick = {(e)=>{
                chatref[`current`] = e.target
                if(Number(type) === 1){
                    setOptions({
                        offy: 20,
                        dir:`right`,
                        list: chatoptions({})
                    })
                }
                if(Number(type) === 2){
                    setOptions({
                        offy: 20,
                        dir:`right`,
                        list: groupoptions({})
                        
                    })
                }
            }}
            className="">{<LucideMenu/>}</div>
        </div>
        <div className="log w-full flex flex-col overflow-x-hidden overflow-y-auto scrolly gap-6 h-full text-white  p-2">
            {(data?.data?.list || []).map((convo, k)=>{
                const date = new Date(convo.date)
                const time = date.toLocaleTimeString()
                const name = convo?.sentBy.username[0]
                const isMe = ()=>convo.sentBy._id === data.userId

                const linkid = convo?.message?.split(`-`)[2]
                const names = linkid?.split(`+`)

                // if(pre === `DT`){//todo}
                if(convo.messageType === `status`){}
                else if(convo.messageType === `todo`){}
                else if(convo.messageType === `Vote-Todo-Link`){
                    return (
                        <div 
                        onClick={()=>{
                            console.log(convo.message)
                            console.log(names)
                            // nav(`/chat?type=1&ref=${linkid}`) 
                        }}
                        className="cursor-pointer">
                            <div className="capitalize">From {data?.refData?.username} To You</div>
                            <div className="">Vote On The TodoList</div>
                        
                            <form className="flex gap-2 flex-col mt-4">{
                                (names || []).map((name, k)=>{
                                    const shouldCheck = convo.votingList.find(e=>e.from === data.userId)?.text === name
                                    const no = convo.votingList.filter(e=>e.text === name)
                                    const obj = {}
                                    const ln = convo.votingList.filter(e=>e.text === name).length
                                    return (
                                        <div className="bg-white/10 rounded-4xl p-2 sm:p-4 border  border-white/20  flex flex-col gap-2 capitalize">
                                            <div className="input w-fit">
                                                <label 
                                                className="flex gap-2 items-center my-2"
                                                htmlFor={name}>
                                                    <input
                                                    onChange={(e)=>{
                                                        voteMutation.mutate({name, convoId: data.data._id, listId:convo._id})
                                                    }}
                                                    type="radio"
                                                    name="option"
                                                    id={name} 
                                                    value={name}
                                                    checked={shouldCheck}
                                                    key={`2882hd8h2921grtcgfj${k}`}
                                                    className=""/>
                                                    {name}
                                                </label>
                                            </div>
                                            <div className=" w-full h-1 rounded-2xl bg-white/20 overflow-auto relative">
                                                <div className="bg-amber-500 w-[10%] h-full rounded-2xl"></div>
                                            </div>
                                            <div className="flex gap-2 items-center opacity-[.6]">
                                                <div className="">{ln}</div>
                                                <div className="">{<UserCircle className="w-4 h-4"/>}</div>
                                                {shouldCheck && <div className="">{<UserCircle className="w-4 text-amber-500 h-4"/>}</div>}
                                            </div>
                                        </div>
                                    )
                                })
                            }</form>
                        </div>
                    )
                }
                else if(convo.messageType === `Group-Link`){
                    return (
                        <div 
                        onClick={()=>{
                            const linkid = convo.message.split(`-`)[2]
                            nav(`/chat?type=2&ref=${linkid}`) 
                        }}
                        className="">
                            <div className="">Invitation</div>
                            <div className="">Cllick to Join Group</div>
                            <div className="">Enter Group</div>

                        </div>
                    )
                }else if(convo.messageType === `Contact-Link`){
                    return (
                        <div 
                        onClick={()=>{
                            const linkid = convo.message.split(`-`)[2]
                            nav(`/chat?type=1&ref=${linkid}`) 
                        }}
                        className="cursor-pointer">
                            <div className="">Add Friend</div>
                            <div className="">Cllick to Add Friend</div>
                            <div className="">Add Friend</div>
                        </div>
                    )
                }else
                return isMe()?
                    <MyLog  
                    onRightClick={(e)=>{
                        chatref.current = e
                        setOptions({
                            dir: `right`,
                            list:messageoptions({})
                        })
                    }}
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
                    onRightClick={(e)=>{
                        chatref.current = e
                        setOptions({
                            dir: `left`,
                            list:messageoptions({})
                        })
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
            let textmssage = message
            let messageType = `message`
            const isglink = isGroupLink(textmssage)    
            if(isglink?.status){
                messageType = `Group-Link`
            }
            const isclink = isContactLink(textmssage)    
            if(isclink?.status){
                messageType = `Contact-Link`
            }
            const isvlink = isVoteTodoLink(textmssage)    
            if(isvlink?.status){
                messageType = `Vote-Todo-Link`
            }
            // console.log(isvlink)
            convomutation.mutate({message:textmssage, messageType}, ref,)
        }}
        />
        <ContextMenu options={options} setOptions={setOptions} ref={chatref}/>

        </>
    )
}
export function AddFriend({data, addFriendMutation}){
    return (
        <div className="bg-black/10 backdrop-blur-2xl z-20 flex text-white justify-center items-center absolute top-0 left-0 w-full h-screen">
            <div className="p-2 border-2 border-white/20 rounded-2xl">
                <div className="capitalize text-4xl my-4 text-center">send request</div>
                <div className="capitalize mb-4">You Dont Have {data?.refData?.username} as a friend</div>
                <div className="profile w-full flex flex-col  justify-center items-center my-4 gap-4">
                    <div className="dice bg-white/10  rounded-full p-2 flex justify-center items-center w-15 h-15">{<Dice3/>}</div>
                    <div className="capitalize opacity-[.7]">{data.refData?.username}</div>
                </div>
                <div 
                onClick={()=>{
                    addFriendMutation.mutate({
                        id: data.refData._id,
                    })
                }}
                className="bg-2 w-full rounded-2xl cursor-pointer bg-blue-600 py-2 text-center">Add Friend</div>
            </div>
        </div>
    )
}
export function JoinMember({data, setc, c, joinGroupMutation}){
    return (
        <div className="absolute top-0 text-white left-0 bg-black/20 backdrop-blur-[20px] w-full h-screen flex justify-center items-center z-20">
        <div className="   capitalize flex items-start justify-start relative gap-4 flex-col bg-black/10 rounded-2xl p-2 ">
            <div 
            onClick={()=>{
            nav(`/`)
            }}
            className="absolute flex justify-center items-center text-white absolute top-1 right-1 w-4 h-4 cursor-pointer">{<XIcon className={`w-fit h-fit`}/>}</div>

            <div className="text-4xl w-full text-center text-blue-600 capitalize">
                Join Group
            </div>
            <div className="">
                Click to Join {data?.refData?.name || data?.refData?.username}
            </div>
            <div className="Rules">
                {data?.refData?.rules?.length && (
                    <p className="text-[.8rem] mb-2 text-center">Please Adhere to the stated rules strictly</p>
                )}
                <div className="rules text-[.7rem]">
                    {
                        ((data?.refData?.rules || []).map((r, k)=>{
                            return (
                                <motion.div 
                                key={`393dbq32321fy25353 5858556${k}`}
                                className="rule"
                                >{r}</motion.div>
                            )
                        }))
                    }
                </div>
            </div>
            <div 
            onClick={()=>{
                setc(true)
                joinGroupMutation.mutate({id:ref})
            }}
            className="Join text-center flex gap-2 items-center justify-center cursor-pointer bg-blue-500 rounded-2xl px-4 py-2 w-full"
            >
                Join 
                {c && <Dices/>}    
            </div>
        </div>
    </div>
    )
}



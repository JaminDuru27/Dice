import {  useMutation,  useQuery,  useQueryClient } from "@tanstack/react-query";
import { delay, motion } from "framer-motion";
import { Dice3, GroupIcon, Link, MessageCircleDashed, Plus, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Groups({setMessage}){
    const queryClient  = useQueryClient()
    const getGroupsFn = async ({name})=> {
        try{
            const api =   `http://localhost:3000`
            const rr = await fetch(`${api}/api/users/group`, {
                method:`GET`,
                headers:{   
                    'Content-Type': `application/json`
                },
                credentials: `include`
            })
            const data = await rr.json()
            return data
        }catch(err){console.error(err)}
    }
    const createGFn = async ({name})=> {
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/group`, {
                method:`POST`,
                headers:{
                    'Content-Type': `application/json`
                },
                body:JSON.stringify({name}),
                credentials: `include`
            })
            const data = await res.json()
            return data
        }catch(err){
            console.error(err)
            throw err
        }
    }
    const createGMutation = useMutation({
        mutationFn: createGFn,
        onSuccess:()=>{
            queryClient.invalidateQueries([`group`])
        }
    })
    const {data, error, isLoading} = useQuery({
        queryFn: getGroupsFn,
        queryKey: [`group`],
        staleTime: 5000,
        refetchOnWindowFocus: false,
        retry: 1,

    })
    if(error) return <p>Error loading groups</p>
    if(isLoading) return <p>Loading...</p>

    const groups = data?.data ?? []

    return (
        <div className="">
            <div className="capitalize mb-2 flex items-center gap-1">{<GroupIcon/>}Groups</div>
            <div 
            style={{boxShadow: `0px 0px 18px -8px black inset  `}}
            className="groups  flex gap-2  relative  p-2 rounded-2xl overflow-x-auto scrollx">
                <div 
                onClick={()=>{
                    createGMutation.mutate({name: `Example Group1`})
                }}
                className="group px-2 flex text-center   shrink-0 min-w-20 cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl  flex-row justify-center items-center gap-0"
                >
                    Add New Group {<Plus size={20}/>}

                </div>
                {(groups || [])?.map((grp) => (
                    <Group
                        id={grp._id}
                        key={grp._id}
                        name={grp.name}
                        cb={() => {}}
                        setMessage={setMessage}
                    />
                ))}
            </div>
        </div>
    )
}
export function Group({key, name, cb, id, setMessage}){
    const nav = useNavigate()
    return (
        <motion.div 
        animate={{opacity: [0, 1]}}
        transition={{delay: 0.1 * key}}
        key={`k13993gdnjoq;'[]${key}`}
        onClick={()=>{cb()}}
        className="group px-2 shrink-0 min-w-20 cursor-pointer drop-shadow-black/100 overflow-hidden relative drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl flex flex-col justify-center items-center">
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis ">{name}</div>
            <div className="icon absolute bottom-2 left-2 text-black/20">
                {<Dice3 size={30}/>}
            </div>
            <div className="flex w-full mt-2 flex items-center justify-between gap-2">
                <div 
                onClick={()=>{
                    navigator.clipboard.writeText(`DG-${id}`)
                    setMessage({message:`copied link`, type: `info`})
                }}
                
                className="dots flex justify-center items-center p-1 w-5 h-5  rounded-full bg-white/10">{<Link/>}</div>
                <div 
                onClick={()=>{
                    nav(`/chat?type=2&ref=${id}`)
                }}
                className=" cursor-pointer w-6 h-6 p-1  rounded-full flex justify-center items-center bg-white/30">{<MessageCircleDashed/>}</div>
            </div>
        </motion.div>
    )
}
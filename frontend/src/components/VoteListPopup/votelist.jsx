import { useQuery, useQueryClient } from "@tanstack/react-query"
import { User2, User2Icon, XIcon } from "lucide-react"
import { useState } from "react"

export function VoteListPopup({setMessage}){
    const   [accts, setAccts] = useState(null)
    console.log(accts)
    const queryClient = useQueryClient()
    const gFn = async()=>{
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/gatherVotersList`, {
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
    const {data,error, isLoading} = useQuery({
        queryFn:gFn,
        queryKey:[`votinglist`],
    })
    if(isLoading)return <>Loading ...</>
    if(error)return <>Error ...</>
    return (
        <div className="absolute  border border-white/10 text-white max-h-40 max-w-1/2 sm:max-w-1/3 md:max-w-1/3 w-40 h-20  overflow-y-auto scrolly  rounded-lg bg-white/10 backdrop-blur-2xl p-2 bottom-40 right-2">
            
            {accts?.length ? (
                <div className="w-full h-full overflow-y-auto overflow-x-hidden scrolly absolute gap-2 top-0 left-0 flex flex-row text-[.7rem] justify-center items-center flex-wrap p-2">
                <div 
                onClick={()=>{setAccts(null)}}
                className=" absolute top-1 left-1 cursor-pointer  text-white">{<XIcon className="w-4 h-4"/>}</div>
                    
                {
                    accts.map(acct=>(
                        <div className=" p-2 border-2 border-white/10 flex items-center gap-2 bg-white/10 rounded-2xl ">
                            <div className="">{<User2 className="w-4 h-4"/>}</div>
                            {acct.username}
                        </div>
                    ))
                }</div>
            ):null}
 
            {!accts? (
                <>
                <div className="">Current Voting List</div>
                <div className="flex text-wrap text-[.7rem] flex-col">
                    {
                        ([
                            {name:`2kdjqjdjiqjidjpoj dhi qi iod`, count: 20, 
                                accounts:[
                                    {username:`Lex ldqqo qjdqo jqod qo uthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                    {username:`Lex luthor`},
                                ]},
                            {name:`2kdjqjdjiqjidjpoj dhi qi iod`, count: 20, accounts:[{username:`Lex luthor`}]},
                        ]).map((data, k)=>{
                            return (
                                <div className="flex items-center gap-2 my-2 flex-wrap justify-end p-2 bg-white/10 rounded-2xl shadow-2xl shadow-black/60">
                                    <div className="p-2 bg-white/10 rounded-2xl">{data?.name}</div>
                                    <div 
                                    onClick={()=>{
                                        setAccts(data.accounts)
                                    }}
                                    className="p-2 bg-white/10 rounded-2xl border-2 border-white/10 flex items-center gap-2">{data?.count} {<User2Icon className="w-4 h-4 sm"/>}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
            ):null}
        </div>
    )
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
export function q(ref, type, setMessage){
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

const mfn = async ({message, messageType},convoId)=>{
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
                messageType,
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
const jGFn = async ({id, e})=>{
    try{
        const ddd =  `userId`
        const location = `Contacts`
        const type = `push`
        const arrayFilters = []
            const api =   `http://localhost:3000`
        const res = await fetch(`${api}/api/users/Group`, {
            method:`PATCH`,
            headers:{
                'Content-Type': `application/json`
            },
            body:JSON.stringify({data:ddd, id, location, type, arrayFilters}),
            credentials: `include`
        })
        const d = await res.json()
        return d.data
    }catch(err){console.error(err)}
}
const addFriendMutationFn = async({id})=>{
    alert(id)
        const api = 'http://localhost:3000'
        const res = await fetch(`${api}/api/users/sendNotifications`,{
            method: `POST`,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                toId:id, 
                message:`Friend Request`,
                data:{
                    type: `Friend Request`,
                }
            }),
            credentials:`include`
        })
        const data = await res.json()
        if(data.success){
            setMessage({type:`success`, message:data.message})
            changeNotifications(`DELETE`, notid)
        }else{
            console.error(data?.message)
        }
    } 
const addFriendMutation = useMutation({
    mutationFn: addFriendMutationFn,
    onSuccess: ()=>{
        queryclient.invalidateQueries([`chat`])
        setMessage({message: `Sent Request Successfull`, type:`success`})
    }
})
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
const joinGroupMutation = useMutation({
    mutationFn: jGFn,
    onSuccess: ()=>{
        queryclient.invalidateQueries([`chat`])
    }
})

return {convomutation,addFriendMutation, joinGroupMutation, queryclient, reactMutation, isLoading, error, data, jGFn, seenMutation, reactfn, ssenfn, fn, mfn}
}
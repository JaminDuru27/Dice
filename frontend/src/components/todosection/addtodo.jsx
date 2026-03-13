import { Plus } from "lucide-react"
import { useState } from "react"
import { Patch } from "../../utils/patch"
import {  useMutation, useQueryClient } from "@tanstack/react-query"

export function AddToList({onAdd = ()=>{}, onCheck, setMessage, profile, name, id}){
    const [timeValue, setTimeValue] = useState(``)
    const [descr, setDescr] = useState(``)
    const [title, setTitle] = useState(``)
    const [date, setDate] = useState(``)

    const AddTodo = async ()=> {
        try{
            const api =   `http://localhost:3000`
            const res = await fetch(`${api}/api/users/Users`, {
                method:`PATCH`,
                headers:{
                    'Content-Type': `application/json`
                },
                body:JSON.stringify(
                    {location:`projects.$[proj].todos`, type:`push`, arrayFilters: [{'proj._id':id}], data:{
                        dueDate: date,
                        title: title,
                        description: descr,
                        badges: [],
                        completed: false
                    }
                }),
                credentials: `include`
            })
            return res.ok
        }
        catch(err){
            console.error(err)
        } 
    }
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: AddTodo,
        onSuccess:()=>{
            queryClient.invalidateQueries([`profile`,`todolist`])
        }
    })
    return (
        <div className="addlist border-2 text-white border-white/90 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex w-full gap-2 justify-between">
                <input onChange={(e)=>{setTimeValue(e.target.value)}} value={timeValue} type="datetime-local" className="time w-1/2" />
                <input required onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" className="input w-1/2 p-2 rounded-2xl border-2 border-white/90" placeholder="Add todo item"/>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full">
                <textarea onChange={(e)=>{
                    setDescr(e.target.value)
                }} name="description"
                className="w-full sm:w-1/2 scrolly  border-2 border-white/90 p-2 text-[.8rem] rounded-2xl" id="description"></textarea>
                <button 
                onClick={()=>{
                    mutation.mutate({})
                    setDate('')
                    setDescr('')
                    setTitle('')
                    setTimeValue('')
                }}
                className="addbtn w-full sm:w-fit bg-gradient-to-r px-4 justify-center  cursor-pointer from-blue-500 to-indigo-700  p-2 outline-2 outline-offset-2 outline-indigo-700  rounded-2xl bg- flex items-center gap-2">Add {<Plus/>}</button>
            </div>
        </div>
    )
}

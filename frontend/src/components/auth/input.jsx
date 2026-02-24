import { useState } from "react";

export function Input({title, type=`text`, required = false, onInput = ()=>{}, key}){
    const [value, setValue] = useState()
    return (
        <div className="input mb-4 z-20" title={title}>
            <div className="capitalize text-[.8rem] opacity-[.8] mb-2 ml-1">{title}</div>
            <input 
            className="w-full h-10 rounded-2xl p-2 bg-black/70 border border-white/20 "
            type={type} required ={required} value={value} onInput={(e)=>{setValue(e.target.value);onInput(e.target.value)}} onChange={(e)=>{setValue(e.target.value);onInput(e.target.value)}}  key={`92j9ej${key}`}  />
        </div>
    )
}

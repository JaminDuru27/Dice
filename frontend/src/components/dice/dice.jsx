import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SmileIcon } from "lucide-react";
import emojisdata from "@emoji-mart/data"
import { NormalMode } from "./modes/NormalMode";

export function Dice({setMessage, cb = ()=>{}}){
    const [mode, setMode]= useState(`normal`)
    const angry = emojisdata.emojis[`angry`].skins[0].native
    const smile = emojisdata.emojis[`smile`].skins[0].native
    return (
        <>
        {/* <div className="mood text-white sm:w-12 sm: h-12 md:w-15 md: h-15 absolute top-24 translate-x-[-50%] left-1/2">{<SmileIcon className="w-full h-full"/>}</div> */}
        <div className="w-full relative gap-4 flex  flex-col justify-start items-center h-full">
            <div className="flex gap-2  items-center z-10">
                <div 
                onClick={()=>{
                    setMode(`dare`)
                }}
                className={`text-2xl ${mode===`dare`?`opacity-[1]`:``} cursor-pointer opacity-[0.5] text-center w-fit  text-white`}>Dare </div>
                <div 
                onClick={()=>{
                    setMode(`normal`)
                }}
                className={`text-2xl ${mode===`normal`?`opacity-[1]`:``} cursor-pointer opacity-[0.5] text-center w-fit  text-white`}>Normal </div>
                <div 
                onClick={()=>{
                    setMode(`group`)
                }}
                className={`text-2xl ${mode===`group`?`opacity-[1]`:``} cursor-pointer opacity-[0.5] text-center w-fit  text-white`}>Group </div>
            </div>
            <NormalMode mode={mode} setMode={setMode} setMessage={setMessage}/>
        </div>
        </>
    )
}
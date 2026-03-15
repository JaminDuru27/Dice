import { motion } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { AddProject } from "../../utils/addProject";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SmileIcon } from "lucide-react";
import emojisdata from "@emoji-mart/data"

export function Dice({setMessage, cb = ()=>{}}){
    const [mode, setMode]= useState(`normal`)
    const angry = emojisdata.emojis[`angry`].skins[0].native
    const smile = emojisdata.emojis[`smile`].skins[0].native
    return (
        <>
        {/* <div className="mood text-white sm:w-12 sm: h-12 md:w-15 md: h-15 absolute top-24 translate-x-[-50%] left-1/2">{<SmileIcon className="w-full h-full"/>}</div> */}
        <div className="w-full relative gap-4 flex  flex-col justify-start items-center h-full">
            <div className="text-2xl text-center w-full  text-white">Dare Mode</div>
            <div className="flex  gap-4 w-full justify-center text-center text-4xl "
            >
                <div className={`Dare ${mode===`normal`?`opacity-[0.7]`:``} text-center w-10`}>Normal</div>
                <div className={`Dare ${mode===`dare`?`opacity-[0.7]`:``} text-center w-10`}>dare</div>
                <div className={`Dare ${mode===`group`?`opacity-[0.7]`:``} text-center w-10`}>Group</div>
            </div>
        </div>
        </>
    )
}
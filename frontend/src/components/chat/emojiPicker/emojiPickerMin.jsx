import emojisdata from "@emoji-mart/data"

import { motion } from "framer-motion"
import { Plus, Smile } from "lucide-react"

export function EmojiPickerMin({emojiPicker,setEmojiPicker, onClickEmoji, setValue}){
    const emojis = Object.values(emojisdata.emojis)
    return (
        <div className="w-full p-2 items-center justify-between rounded-4xl gap-2 flex items-center bg-black/20 border border-white/20"
        >
            <div className="">{
                <Smile/>
                }</div>
            <div className="flex overflow-x-auto scrollx gap-2 items-center justify-between">
                {emojis.slice(0, 20).map((e,k)=>{
                return (
                <motion.div 
                onClick={()=>{onClickEmoji(e.skins[0].native)}}
                key={`0299j29992h766262f${11}${k}`}
                initial={{translateY: 5}}
                animate={{translateY: 0}}
                whileHover={{translateY: -5}}
                className="cursor-pointer">{e.skins[0].native}</motion.div>
                )
            })}
            </div>
            <div 
            onClick={()=>{
                setEmojiPicker({cb:(v)=>{
                    setValue(e=>e+=v)
                }})
            }}
            className="">
                {<Plus/>}
            </div>
        </div>
    )
}

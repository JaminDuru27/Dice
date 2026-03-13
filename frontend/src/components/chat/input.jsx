import { useState } from "react"
import { EmojiPicker } from "./emojiPicker/emojipicker"
import { Keyboard, Send } from "lucide-react"

export function Input({onSend = ()=>{}, emojiPicker, setEmojiPicker}){
    const [value, setValue] = useState(``)
    return (
        <div 
        style={{boxShadow: `0px 0px 24px -12px black`}}
        className="fixed w-[80%] bottom-10 flex text-[60%] md:text-[100%] justify-between items-center gap-2 left-1/2 translate-x-[-50%] rounded-2xl text-white  flex-col gap-2">
        <EmojiPicker
        emojiPicker={emojiPicker}
        setEmojiPicker={setEmojiPicker}
        setValue={setValue}
        />
        <div 
            className="w-full  justify-between items-center gap-2  rounded-2xl border-2 border-white/20 bg-black/40 text-white p-2 flex">
                <div className="flex w-[100%] items-center gap-2">
                    <Keyboard/>
                    <input 
                    onKeyDown={(e)=>{
                        if(e.key === `Enter`){
                            if(value.trim() !== ``)
                            onSend(value)
                        }
                    }}
                    className={` p-2 w-full`}
                    value={value} onInput={(e)=>{setValue(e.target.value)}} type="text" />
                </div>
                <div 
                onClick={()=>{if(value.trim() !== ``)onSend(value); setValue(``)}}
                className="send flex items-center gap-2  cursor-pointer bg-white/20 rounded-2xl p-2 ">Send {<Send size={18}/>}</div>
    
            </div>             
        </div>
    )
}
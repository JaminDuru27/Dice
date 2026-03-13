import { Search, XCircleIcon, XIcon } from "lucide-react";
import emojisdata from "@emoji-mart/data"
import { useState } from "react";
import { motion } from "framer-motion";

export function EmojiPickerMax({setEmojiPicker, emojiPicker, onEmojiSelect=()=>{}}){
    const emojis = Object.values(emojisdata.emojis)
    const [resultList, setResultList] = useState([])
    const [value, setValue] = useState(``)
    return (
        <motion.div 
        initial={{translateY:20}}
        animate={emojiPicker?{display:`block`, opacity:1, translateY:0}:{display:`none`,translateY:20, opacity:0}}
        className="w-full p-2 bg-black/10  backdrop-blur-2xl border-2 border-white/10 rounded-4xl">
            <div 
            onClick={()=>{
                setEmojiPicker(e=>false)
            }}
            className="exit w-8 h-8 border border-white/20 flex justify-center items-center rounded-full bg-black/20 backdrop-blur-2xl absolute top-[-60px] left-1/2 translate-x-[-50%]">{<XIcon/>}</div>
            <div className="flex z-20 items-center justify-between gap-2 border-2 border-white/20 rounded-3xl sm:p-2 p-1 ">
                    <input 
                    value={value}
                    onInput={(e)=>{
                        setValue(e.target.value)
                        const allIcons = Object.values(emojisdata.emojis)
                        const res = allIcons.filter(i=>{
                            const r = i.keywords.includes(e.target.value)
                            return r?i.skins[0].native:null 
                        })
                        setResultList(res)
                    }}
                    placeholder="Search Icon"
                    className="w-full sm:p-2 rounded-2xl   "
                    type="text" />
                    <div className=" ab">
                    <Search />
                    </div>
            </div>  
        <div className="text-[1.2rem] relative my-4  opacity-[.7] text-center w-full">
            Categories
            <div 
            style={{backgroundImage: `linear-gradient(to right, transparent, rgba(225, 225, 225, 0.5), transparent)`}}
            className="absolute bottom-[-8px] left-0 h-[2px] w-full "></div>    
            
        </div>
        {
            resultList?.length ?
            <SearchResult setEmojiPicker={setEmojiPicker} emojiPicker={emojiPicker} setResultList={setResultList} resultList={resultList} setValue={setValue} onEmojiSelect={onEmojiSelect}/>
            :<></>
            }

        <Content onEmojiSelect={onEmojiSelect} emojiPicker={emojiPicker} setEmojiPicker={setEmojiPicker}/>
        </motion.div>
    )
}
function SearchResult({setResultList, emojiPicker, setEmojiPicker, resultList, setValue, onEmojiSelect}){
    return (
        <div className="absolute top-20 z-10 left-0  bg-black/70 p-2 backdrop-blur-2xl w-full h-[74%] rounded-2xl ">
            <div 
            onClick={()=>{
                setResultList([])
                setValue(``)
            }}
            className="absolute text-white  top-1 right-1 w-3 h-3 cursor-pointer rounded-full bg-white/20 flex justify-center items-center"
            >{<XCircleIcon/>}</div>
            <div className="resultList">Results ({resultList.length})</div>
            <div className="content w-full mt-4 max-h-[80%]  border rounded-2xl p-2 border-white/20 flex flex-wrap gap-2  justify-start items-start overflow-y-auto scrolly"
            >
                {resultList?.map((r, i)=>{
                    return !r?<></>
                    :<div
                    onClick={()=>{
                        onEmojiSelect(r.skins[0].native)
                        if(emojiPicker)emojiPicker.cb(r.skins[0].native)
                        setValue(``)
                        setResultList([])
                        setEmojiPicker(null)
                    }}
                    className="cursor-pointer w-5 h-5 rounded-full bg-white/10 flex justify-center items-center"
                    key={`209929929220200229{${i}`}
                    >{r.skins[0].native}</div>
                })}
            </div>
        </div>
    )    
}
function Content({onEmojiSelect=()=>{}, setEmojiPicker, emojiPicker}){
    return (
    <div className="content max-h-[25vh] overflow-y-auto scrolly">
        {emojisdata.categories.map((cat, k)=>{
            return (
                <div 
                key={`029i29u8272622424242jdniayaha${k}`}
                className="w-full">
                    <div className="name uppercase my-2 opacity-[.6] text-[.8rem]">{cat.id}</div>
                    <div className="content gap-2 p-2 flex items-center justify-center flex-wrap w-full border-2 border-white/20 rounded-2xl justify-start">
                        {
                            cat.emojis.map((e,k)=>{
                                const native = emojisdata.emojis[e].skins[0].native
                                return (
                                    <div 
                                    onClick={()=>{
                                        if(emojiPicker)emojiPicker.cb(native)
                                        onEmojiSelect(native);setEmojiPicker(null)
                                    }}
                                    key={`0o0o200jjd0s0w0200202020${k}`}
                                    className=" w-6 cursor-pointer h-6 flex justify-center bg-white/20 rounded-full items-center "
                                    >{native}</div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })}
    </div>
    )
}
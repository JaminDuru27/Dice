import { motion } from "framer-motion";
import { Music, Music2, Music3, Music4Icon } from "lucide-react";

export function ClockSettings(){
    return (
        <div className="">
            <div className="title flex items-center justify-start gap-1 mb-2  ">{<Music4Icon/>}Tunes</div>
            <div className="audio mb-2 flex relative  flex-col sm:flex sm:flex-row justify-start  items-center gap-2 ">
                <div className="icon p-2 rounded-full bg-white/20 sm:w-15 sm:h-15 sm:relative absolute top-0 right-[-10px] translate-[-20%] sm:translate-0 sm:right-0 w-10 h-10 border-8 flex justify-center items-center text-black/90 border-black/20">
                    {<Music/>}
                </div>
                <div className="mainaudio text-black my-1 p-2 bg-black/20 w-full rounded-2xl flex flex-col">
                    <div className="name text-[.7rem]">Audio.wav</div>
                    <div className="audio w-full">
                        <audio
                        controls 
                        className="w-full h-5 sm:h-10"
                        src="/ringtones/audio1.mp3">Audio1</audio>
                    </div>
                </div>
            </div>
            <div className="bg-black/20 rounded-2xl p-4 max-h-40 overflow-y-auto scrolly  ">
                <div className="capitalize text-[.9rem] text-[90%] flex  items-center sm:text-[100%] mb-4">other tunes{<Music2 className="w-4 h-4 sm:w-8 sm:h-8"/>}</div>
                <div className="flex w-full flex-wrap gap-2 justify-center items-center">
                    <Tune/>    
                    <Tune/>    
                    <Tune/>    
                </div>    
            </div>
        </div>
    )
}
export function Tune(){
    return (
        <motion.div 
        whileHover={{translateY:-8}}
        className="flex shrink-0 justify-center shadow-2xl w-20 h-20 p-2 flex-col rounded-md bg-black/20 items-center gap-2">
            <div className="bg-black/20 p-2 w-10 h-10 rounded-full"><Music/></div>
            <div className="capitalize text-[.8rem]">Lamb</div>
        </motion.div>
    )
}
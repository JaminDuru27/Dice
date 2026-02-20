import { delay, motion } from "framer-motion";
import { Dice3, GroupIcon, MessageCircleDashed, Plus } from "lucide-react";

export function Groups(){
    return (
        <div className="">
            <div className="capitalize mb-2 flex items-center gap-1">{<GroupIcon/>}Groups</div>
            <div 
            style={{boxShadow: `0px 0px 18px -8px black inset  `}}
            className="groups  flex gap-2  relative  p-2 rounded-2xl overflow-x-auto scrollx">
                <div 
                className="group px-2 flex text-center   shrink-0 min-w-20 cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl  flex-row justify-center items-center gap-0"
                >
                    Add New Group {<Plus size={20}/>}

                </div>
                <Group key={0} name={`gergaubd`} cb={()=>{}}/>
                <Group key={1} name={`0983hfhji he8dj2j`} cb={()=>{}}/>
                <Group key={2} name={`9039293jfj2jfjhf9hhfh82`} cb={()=>{}}/>
                <Group key={3} name={`30fj9 d38h 302h3 28 d8 3`} cb={()=>{}}/>
            </div>
        </div>
    )
}
export function Group({key, name, cb}){
    return (
        <motion.div 
        animate={{opacity: [0, 1]}}
        transition={{delay: 0.1 * key}}
        key={`k13993gdnjoq;'[]${key}`}
        onClick={()=>{cb()}}
        className="group px-2 shrink-0 min-w-20 cursor-pointer drop-shadow-black/100 overflow-hidden drop-shadow-2xl w-fit bg-white/20 p-2 rounded-2xl flex flex-col justify-center items-center">
            <div className="name  text-[.6rem] w-fit max-w-30  text-ellipsis ">{name}</div>
            <div className="icon absolute bottom-2 left-2 text-black/20">
                {<Dice3 size={30}/>}
            </div>
            <div className="flex w-full mt-2 flex items-center justify-end gap-2">
                <div className=" w-6 h-6 p-1  rounded-full flex justify-center items-center bg-white/30">{<MessageCircleDashed/>}</div>
            </div>
        </motion.div>
    )
}
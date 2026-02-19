import { motion } from "framer-motion";
import { CheckCircle, CheckCircle2Icon, Circle, CircleCheck, CircleIcon, Clock10, Dice2, Dice3, Dice4, Dice6, List, Plus } from "lucide-react";
import { useState } from "react";

export function Todo({setMessage}) {
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-start items-start">
            <div 
            style={{
                backgroundImage: `linear-gradient(90deg, #08dcc6, #e73ae7)`,
                WebkitBackgroundClip:`text`,
                backgroundClip: `text`,
                color: `transparent`,
                WebkitTextFillColor: `transparent`
            }}
            className=" flex gap-2 justify-center items-center text-6xl font-bold text-white"> 
                Running
                {<Dice3 size={50}/>}</div>
            <div className="todo relative w-full h-full rounded-sm b p-4 flex flex-col gap-4">
                <div 
                style={{}}
                className="text-blue-600 flex items-center gap-2">Youre Almost There {<Clock10/>}</div>
                <div 
                className="bar w-full rounded-2xl border-2 border-white/20 overflow-hidden">
                    <motion.div 
                    animate={{width: `100%`}}
                    transition={{duration: 1}}
                    style={{backgroundImage: `linear-gradient(90deg, #08dcc6, #e73ae7)`}}
                    className="lev w-[40%] rounded-lg shadow-2xs h-2 bg-purple-700"></motion.div>
                </div>
                <div className="list g-[#888383db]/20 backdrop-blur-2xl shadow-2xl w-full h-fit gap-8 rounded-sm b p-4 flex flex-col ">

                    <ListItem time={`10:20pm`} date={`12/08/26`} title={`Start Joffing`} descr={`dow iwhiq wy`} completed={true}/>
                    <ListItem time={`10:20pm`} date={`12/08/26`} title={`Start Joffing`} descr={`dow iwhiq wy`} completed={true}/>
                    <ListItem time={`10:20pm`} date={`12/08/26`} title={`Start Joffing`} descr={`dow iwhiq wy`} completed={true}/>
                    <ListItem time={`10:20pm`} date={`12/08/26`} title={`Start Joffing`} descr={`dow iwhiq wy`} completed={true}/>
                    <ListItem time={`10:20pm`} date={`12/08/26`} title={`Start Joffing`} descr={`dow iwhiq wy`} completed={true}/>
                    <div className="addlist border-2 text-white border-white/20 rounded-2xl p-4 flex flex-col gap-4">
                        <div className="flex w-full gap-2 justify-between">
                            <input type="time" className="time w-1/2" />
                            <input required type="text" className="input w-1/2 p-2 rounded-2xl border-2 border-white/20" placeholder="Add todo item"/>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full">
                            <textarea name="description" className="w-full sm:w-1/2 border-2 border-white/20 p-2 text-[.8rem] rounded-2xl" id="description"></textarea>
                            <button className="addbtn w-full sm:w-fit bg-gradient-to-r px-4 justify-center  cursor-pointer from-blue-500 to-indigo-700  p-2 outline-2 outline-offset-2 outline-indigo-700  rounded-2xl bg- flex items-center gap-2">Add {<Plus/>}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ListItem({date, time, title, descr, completed, completedChange=()=>{}}){
    const [open, setopen] = useState(false)
    const [comp, setcomp] = useState(completed)
    return (
        <motion.div 
        animate={{opacity:[0,1], translateY:[10, 0]}}
        transition = {{duration:1}}
        className="list p-2 border-white/20 relative border-2 gap-2 rounded-2xl flex p-4">
            <div className="text-black capitalize w-full">
                <div className="tile absolute top-0 translate-y-[-100%] left-2 text-[.6rem]  capitalize">
                    {time}, {date}
                </div>
                <div className="title">{title}</div>
                <motion.div 
                onClick={()=>{setopen(p=>!p)}}
                animate={open?{height: `fit-content`}:{height:20}}
                className="descr overflow-hidden p-2 text-black/80 text-[.7rem]">{descr}</motion.div>
            </div>
            <motion.div 
            whileTap={{scale:.7}}
            onClick={()=>{
                setcomp(p=>!p)
                completedChange(comp)
            }}
            className="check cursor-pointer h-fit">
                {comp?<CheckCircle/>: <CircleIcon/>}
            </motion.div>
        </motion.div>
    )
}
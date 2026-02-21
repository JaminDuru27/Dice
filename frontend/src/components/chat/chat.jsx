import { motion } from "framer-motion";
import { Dice3, DoorClosedIcon, DoorOpenIcon, DropletsIcon, Keyboard, Send} from "lucide-react";
import { useState } from "react";
import { MyLog } from "./mylog";
import { Log } from "./log";
import { useNavigate } from "react-router-dom";

export function Chat(){
    const nav = useNavigate()
    return (
        <>
        <div
        onClick={()=>{
            nav(`/`)
        }}
        className="exit text-white p-2   absolute top-0 left-0 sm:top-2 sm:left-2 md:top-4 md:left-4  justify-center items-center w-6 h-6">
            {<DoorOpenIcon size={18}/>}
        </div>
        <div className="rounded-4xl text-[60%] sm:text-[80%] md:text-[100%] bg-white/20 text-white flex justify-between items-center p-2 w-[80%] h-fit  top-4 left-1/2 translate-x-[-50%] fixed gap-4"
        >
            <div className="flex items-center gap-2">
                <div className="icon">{<Dice3/>}</div>
            <div className="">Group Name</div>
            </div>

            <div className="">{<DropletsIcon/>}</div>
        </div>
        <div className="log w-full flex flex-col overflow-x-hidden overflow-y-auto scrolly gap-6 h-full text-white  p-2">
            <Log by={`Ts`} text={`Hi welcome to my group`} time={`12:00 PM`} key={0} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <Log by={`OM`} text={`How are you?`} time={`12:01 PM`} key={1} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <Log by={`Pt`} text={`I am good, thanks for asking!`} time={`12:02 PM`} key={2} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <Log by={`OM`} text={`What about you?`} time={`12:03 PM`} key={3} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <Log by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={4} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <MyLog by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={0} status={`sent`}/>
            <Log by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={8} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <Log by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={6} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <MyLog by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={0} status={`sent`}/>
            <MyLog by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={3} status={`sent`}/>
            <Log by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={4} onSeen={()=>console.log("seen")} status={`delivered`}/>
            <MyLog by={`Ts`} text={`I am doing well too!`} time={`12:04 PM`} key={7} status={`sent`}/>

                {/* <div className="message bg-gradient-to-r from-blue-500 to-indigo-700 text-white p-2 rounded-2xl w-fit">Hello, how are you?</div> */}
        </div>
        <Input
        onSend= {()=>{}}
        />

        </>
    )
}

export function Input(onSend = ()=>{}){
    const [value, setValue] = useState(``)
    return (
        <div 
        style={{boxShadow: `0px 0px 24px -12px black`}}
        className="w-[80%] fixed bottom-10 flex text-[60%] md:text-[100%] justify-between items-center gap-2 left-1/2 translate-x-[-50%] rounded-2xl border-2 border-white/20 bg-black/40 text-white p-2 flex">
            <div className="flex w-[70%] [items-center gap-2">
                {<Keyboard/>}
                <input 
                className={` p-2 w-full`}
                value={value} onInput={(e)=>{setValue(e.target.value)}} type="text" />
            </div>
            <div 
            onClick={()=>{onSend(value); setValue(``)}}
            className="send flex items-center gap-2  cursor-pointer bg-white/20 rounded-2xl p-2 ">Send {<Send size={18}/>}</div>
        </div>
    )
}


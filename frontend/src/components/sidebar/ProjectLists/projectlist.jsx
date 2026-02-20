import { motion } from "framer-motion";
import { Cloud, DoorClosedIcon, DoorOpenIcon, PlusIcon, SunIcon } from "lucide-react";

export function ProjectList({d,setD}){
    return (
        <motion.div 
        animate={(d?.name === `projects`)?{opacity: [0,1,], translateX: [-50, 5]}:{opacity: [1, 0], translateX: [5, -50], display: `none`}}
        style={{boxShadow: `2px 2px 24px -7px black`}}
        className="w-[40%] sm:w-1/4 p-2 md:w-1/4 lg:w-1/6 border border-white/20  rounded-sm bg-white/2 text-white backdrop-blur-2xl h-[90vh] fixed top-1/2 translate-y-[-50%] left-0 z-10">
            <motion.div 
            onClick={()=>{
                setD(false)
            }}
            className="exit absolute top-0 w-7 h-7  right-0 translate-x-[120%] flex justify-center items-center bg-white/30 p-2 rounded-full backdrop-blur-3xl  translate-y-[50%] cursor-pointer "
            >{<DoorOpenIcon className="w-full h-full text-white"/>}</motion.div>
            <div className="weather flex justify-between items-center mb-4 gap-2">
                <div className="sunny w-7 h-7 justify-center bg-white/20 p-2 rounded-full items-center flex ">{<Cloud size={20}/>}</div>
                <div className="descr text-[.4rem] sm:text-[.7rem]  md:text-[.8rem] lg:text-[.9rem]">
                    <div className="temp flex items-center gap-1 capitalize ">
                        <div className="flex items-center gap-1 ">Sunny {<SunIcon size={12}/>}</div>
                        <div className="flex items-center gap-1 ">30C</div>
                    </div>
                    <div className="date capitalize ">Friday Feb, 2026</div>
                </div>
            </div>
            <div className="list text-[.7rem] flex flex-col gap-2">
                {
                    ([{date: `Tuesday`, name: `Socks`}, {date: `Wednesday`, name: `Shirts`}, {date: `Thursday`, name: `Pants`}]).map(({date, name}, k)=>{
                        return (
                            <div 
                            cb={(e)=>{
                                //usenav
                            }}
                            className="w-full cursor-pointer border border-white rounded-sm p-2 py-1 sm:py-2 ">
                                <div className="date text-amber-500">{date}</div>
                                <div className="title">{name}</div>
                            </div>
                        )
                    })
                }
                <div className="w-full border flex justify-center items-center gap-2 mt-4  border-white rounded-sm p-2">
                Add {<PlusIcon/>}</div>
            </div>
        </motion.div>
    )
}
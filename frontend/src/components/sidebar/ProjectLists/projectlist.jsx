import { motion } from "framer-motion";
import { DoorClosedIcon, DoorOpenIcon, PlusIcon, SunIcon } from "lucide-react";

export function ProjectList(){
    return (
        <motion.div 
        animate={{opacity: [0,1]}}
        className="w-1/2 rounded-sm bg-white/2 backdrop-blur-2xl h-screen fixed top-0 left-0 z-10">
            <div className="exit">{<DoorOpenIcon/>}</div>
            <div className="weather flex">
                <div className="sunny"></div>
                <div className="descr">
                    <div className="temp">
                        <div className="">Sunny {<SunIcon/>}</div>
                        <div className="">30&celsius;c</div>
                    </div>
                    <div className="date">tuesday</div>
                </div>
            </div>
            <div className="list">
                <div className="w-full border border-white rounded-sm p-2">
                    <div className="date">Tuesday</div>
                    <div className="title">Socks</div>
                </div>
                <div className="w-full border flex justify-center items-center gap-2 mt-4  border-white rounded-sm p-2">
                Add {<PlusIcon/>}</div>
            </div>
        </motion.div>
    )
}
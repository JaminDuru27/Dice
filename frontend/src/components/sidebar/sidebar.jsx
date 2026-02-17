import { motion } from "framer-motion"
import { AccessibilityIcon, Clock10, MenuSquare, Music2 } from "lucide-react"
import { HamburgerIcon, UserCircle } from "lucide-react"
export function SideBar({openSide, setOpenSide}){
    const style = ``
    return (
        <motion.div 
        animate={openSide?{opacity: [0, 1], translateX:[-50, 0], display:`flex`}:{opacity: [1, 0], translateX:[0, -50], display: `none`}}
        className="sidebar p-2 bg-2 rounded-full absolute top-1/2 left-4 flex flex-col gap-2 translate-y-[-50%] bg-white/20 backdrop-blur-2xl z-10 ">
            <Btn setOpenSide={setOpenSide} element={<UserCircle />}/>
            <Btn setOpenSide={setOpenSide} element={<MenuSquare />}/>
            <Btn setOpenSide={setOpenSide} element={<AccessibilityIcon/>}/>
            <Btn setOpenSide={setOpenSide} element={<Clock10/>}/>
        </motion.div>
    )
}

function Btn({element , cb = ()=>{}, setOpenSide}){
    return (
        <motion.div
        whileTap={{scale: .8}}
        onClick={()=>{cb(); setOpenSide(false)}}
        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-700 p-1 text-white rounded-full cursor-pointer flex justify-center items-center"
        >{element}
        </motion.div>
    )
}
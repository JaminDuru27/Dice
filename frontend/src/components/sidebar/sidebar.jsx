import { motion } from "framer-motion"
import { AccessibilityIcon, Clock10, Group, MenuSquare, MessageCircle, Music2, Users2, UsersIcon, UsersRoundIcon, UserStar } from "lucide-react"
import { HamburgerIcon, UserCircle } from "lucide-react"
import { AccesibilityMenu } from "./accessibility/menu"
import { useState } from "react"
import { ClockSettings } from "./clock/clocksettings"
import { Groups } from "./groups/groups"
import { ProjectList } from "./ProjectLists/projectlist"
import { Contacts } from "./contacts/contacts"
export function SideBar({openSide, setOpenSide, accessibility, setAccessibility}){
    const style = ``
    const [d, setD] = useState(undefined)
    return (
        <>
        <ProjectList d={d} setD={setD} accessibility={accessibility} setAccessibility={setAccessibility}/>
        {d &&!d.hide && (
            <SideMenuWrap info={d}>
                {
                    d?.name === `accessibility`&& <AccesibilityMenu accessibility={accessibility} setAccessibility={setAccessibility} />
                }
                {
                    d?.name === `clocksettings`&& <ClockSettings accessibility={accessibility} setAccessibility={setAccessibility} />
                }
                {
                    d?.name === `groups` && <Groups accessibility={accessibility} setAccessibility={setAccessibility} />
                }
                {
                    d?.name === `contacts` && <Contacts accessibility={accessibility} setAccessibility={setAccessibility} />
                }
            </SideMenuWrap>
        )}
        <motion.div 
        animate={openSide?{opacity: [0, 1], translateX:[-50, 0], display:`flex`}:{opacity: [1, 0], translateX:[0, -50], display: `none`}}
        className="sidebar p-2 bg-2 rounded-full absolute top-1/2 shadow-2xl left- flex flex-col gap-2 translate-y-[-50%] bg-white/20 backdrop-blur-2xl z-10 ">
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{console.log(`open acct`)}}element={<UserCircle />}/>
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{setD({name:`projects`, hide:true, x: e.clientX + 50, y: e.clientY }); setOpenSide(false)}} element={<MenuSquare />}/>
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{
                setD({name:`accessibility`, x: e.clientX + 50, y: e.clientY })
            }} element={<AccessibilityIcon/>}/>
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{setD({name:`clocksettings`, x: e.clientX + 50, y: e.clientY })}} element={<Clock10/>}/>
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{setD({name:`groups`, x: e.clientX + 50, y: e.clientY })}}element={<UsersIcon />}/>
            <Btn setD={setD} setOpenSide={setOpenSide} cb={(e)=>{setD({name:`contacts`, x: e.clientX + 50, y: e.clientY })}}element={<MessageCircle/>}/>
        </motion.div>
        </>
    )
}

function Btn({element , setD, cb = ()=>{}, setOpenSide}){
    return (
        <motion.div
        whileTap={{scale: .8}}
        onClick={()=>{setOpenSide(false); setD(false)}}
        onHoverStart={(e, op)=>{cb({clientX: e.target.getBoundingClientRect().x, clientY: e.target.getBoundingClientRect().y})}}
        className="sm:w-10  sm:h-10 w-6 h-6 bg-gradient-to-r  from-blue-500 to-indigo-700 p-1 text-white rounded-full cursor-pointer flex justify-center items-center"
        >{element}
        </motion.div>
    )
}

export function SideMenuWrap({info, children}){
    return(
        <motion.div 
        animate={!info?{display:`none`, opacity:0}:{display: `block`,opacity: 1}}
        transition={{duration: 20}}
        style={{top: `${info.y}px`, left: `${info.x }px`}}
        className="menu w-1/2 h-fit text-[70%] sm:text-[100%] p-4 z-20   drop-shadow-amber-600 rounded-md  bg-gray-50/20 backdrop-blur-2xl border border-white/30 shadow-gray-900 absolute top-1/2 left-10">
            <div className="rounded-full bg-white/20 border-white/20 border absolute w-2 h-2 translate-x-[-200%] top-0 left-0 translate-y-[50%] "></div>
            {children}
        </motion.div>
    )
}
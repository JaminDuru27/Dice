import { useEffect } from "react"
import { Acct } from "../components/acct/acct"
import { Dice } from "../components/dice/dice"
import { Navbar } from "../components/navbar/nav"
import { SideBar } from "../components/sidebar/sidebar"
import { GetProfile } from "../utils/getProfile"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Notifications } from "../components/notifications/notificatitons"

export function Home({setMessage,data,setShowSearch, openNotification, setOpenNotification, profile, accessibility, setAccessibility, setOpenAcct, openAcct, setOpenSide, openSide}){
    const nav = useNavigate()
    const [p, setProfile] = useState(profile)
    return(
        <>
        <Navbar onnotificationclick={()=>{setOpenNotification(p=>!p);setOpenAcct(false)}} setShowSearch={setShowSearch} profile={data} onbarclick={()=>{setOpenNotification(false);setOpenSide(p=>!p)}} onprofileclick={()=>{setOpenAcct(p=>!p)}} />
        <Acct profile={profile} setOpenAcct={setOpenAcct} openAcct ={openAcct}/>
        <Notifications setMessage={setMessage} profile={data} setOpenNotification={setOpenNotification} openNotification ={openNotification}/>
        
        <SideBar setMessage={setMessage} setShowSearch={setShowSearch} profile={profile} accessibility={accessibility} setAccessibility={setAccessibility} openSide={openSide} setOpenSide={setOpenSide}/>
        <Dice setMessage={setMessage} />
        </>
    )
}

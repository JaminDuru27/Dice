import { useEffect } from "react"
import { Acct } from "../components/acct/acct"
import { Dice } from "../components/dice/dice"
import { Navbar } from "../components/navbar/nav"
import { SideBar } from "../components/sidebar/sidebar"
import { GetProfile } from "../utils/getProfile"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Home({data, setMessage, profile, accessibility, setAccessibility, setOpenAcct, openAcct, setOpenSide, openSide}){
    const nav = useNavigate()
    const [p, setProfile] = useState(profile)
    return(
        <>
        <Navbar profile={profile} onbarclick={()=>{setOpenSide(p=>!p)}} onprofileclick={()=>{setOpenAcct(p=>!p)}} />
        <Acct profile={profile} setOpenAcct={setOpenAcct} openAcct ={openAcct}/>
        <SideBar profile={profile} accessibility={accessibility} setAccessibility={setAccessibility} openSide={openSide} setOpenSide={setOpenSide}/>
        <Dice setMessage={setMessage} />
        </>
    )
}
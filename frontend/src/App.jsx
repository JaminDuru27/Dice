import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Intro } from './components/intro/intro'
import { Navbar } from './components/navbar/nav'
import { Dice } from './components/dice/dice'
import { Feedback } from './components/feedback/feed'
import { useEffect } from 'react'
import { SideBar } from './components/sidebar/sidebar'

function App() {
  const [message, setMessage] = useState({message:`Welcome back! Ready to roll the dice?`, type: `info`})
  const [openSide, setOpenSide] = useState(false)
  useEffect(()=>{
        let mousedown
        const timeout = setTimeout(()=>{
          mousedown = window.addEventListener(`mousedown`,()=>{
            setMessage()
          })
        }, 50)
        return ()=>{
          clearTimeout(timeout)
          window.removeEventListener(`mousedown`, mousedown)
        }
   }
    ,[])
  return (
    <>
    {/* <Intro /> */}
    <div className="home flex flex-col ">
      <Navbar onbarclick={()=>{setOpenSide(p=>!p)}} onprofileclick={()=>{}} />
      <SideBar openSide={openSide} setOpenSide={setOpenSide}/>
      <div className="bgdesigns w-full h-full absolute top-0 left-0 -z-10">
        <img src="/bg (2).jpg" alt="bg2" className="w-full  h-full object-cover absolute top-0 left-0 opacity-50"/>
      </div>

      <div 
      className="main relative p-4 w-full h-screen pt-20 text-black  rounded-sm bg-[#888383db]  ">
        {<Feedback message={message} />}
        {<Dice setMessage={setMessage}/>}
     </div>
    </div>
    </>
  )
}

export default App

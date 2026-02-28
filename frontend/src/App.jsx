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
import { BrowserRouter, Router, Route, Routes, useNavigate, Navigate} from 'react-router-dom'
import { Todo } from './components/todosection/todo'
import { Acct } from './components/acct/acct'
import { Chat } from './components/chat/chat'
import { Auth } from './components/auth/auth'
import { Home } from './pages/home'
import { useQuery} from '@tanstack/react-query'
import { Loading } from './loading/loading'
// import {} from '@tanstack/react-router'
function App() {
  const [message, setMessage] = useState({message:`Welcome back! Ready to roll the dice?`, type: `info`})
  const [openSide, setOpenSide] = useState(false)
  const [openAcct, setOpenAcct] = useState(false)
  const [accessibility, setAccessibility]  = useState({
    theme: `normal`,
    fontsize: 100,
    keyboardnav: false,
    reducedMotion: false,
    dislexicfont: false,
    linespacing: 100

  })
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
  const fetchProfile = async ()=>{
    const api = `http://localhost:3000`

    const response = await fetch(`${api}/api/users/profile`,{
      method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Send cookies with request
    })
    if(!response.ok) throw new Error(`Error fetching Data`)
    const json = await response.json()
    return json.data
  }
  const {data, isLoading, error} = useQuery({
    queryKey: [`profile`],
    queryFn: fetchProfile,
    staleTime: 5000
  } )
  if(isLoading) return <Loading/>
  if(error) return (
      <Auth setMessage={setMessage} />
  )
  return (
    <>
    <Intro />
    <div 
    style={{
      fontSize: `${accessibility.fontsize}%`,
      lineHeight: `${accessibility.linespacing}%`,
      fontFamily: `${accessibility.dislexicfont?`dyslexic`:`geoform`}`
    }}
    className="home flex flex-col overflow-hidden ">
      <div className="bgdesigns w-full h-full absolute top-0 left-0 -z-10">
        <img src="/bg (2).jpg" alt="bg2" className="w-full  h-full object-cover absolute top-0 left-0 opacity-50"/>
      </div>

      <div 
      className="main overflow-y-auto scrolly  relative p-4 w-full h-screen pt-20 text-black  rounded-sm bg-black/90   ">
        {<Feedback message={message} />}
          <Routes>
            <Route path='/' element={
              <>
                <Home 
                setOpenAcct={setOpenAcct} 
                openAcct={openAcct} 
                setOpenSide={setOpenSide} 
                openSide={openSide} 
                setMessage={setMessage} 
                accessibility={accessibility} 
                setAccessibility={setAccessibility}
                profile={data}
                />  
              </> 
            } />
          </Routes>
          <Routes>
            <Route path='/todo' element={
              <>
                <Navbar profile={data} onbarclick={()=>{setOpenSide(p=>!p)}} onprofileclick={()=>{setOpenAcct(p=>!p)}} />
                <Acct profile={data} setOpenAcct={setOpenAcct} openAcct ={openAcct}/>
                <SideBar profile={data} accessibility={accessibility} setAccessibility={setAccessibility} openSide={openSide} setOpenSide={setOpenSide}/>
                <Todo profile={data} setMessage={setMessage} />
              </>
            } />
          </Routes>
          {/* <Routes>
            <Route path='/auth' element={
              <>
              </>
            } />
          </Routes> */}

          <Routes>
            <Route path='/chat' element={
              <>
                <Chat setMessage={setMessage} />
              </>
            } />
          </Routes>
     </div>
    </div>
    </>
  )
}
export default App

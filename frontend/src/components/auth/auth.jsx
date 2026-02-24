import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { useNavigate } from "react-router-dom";

export function Auth({setMessage}) {
    const [authState, setAuthState] = useState(`login`)
    const nav = useNavigate()
    return (
        <div className="absolute top-0 left-0 text-white bg-black overflow-hidden flex justify-center items-center w-full h-full">
            <div className="">
                <img src="/bg (7).jpg" alt="auth background" className="w-full h-full object-cover" />
            </div>
            {/* <Design/> */}
            <div className="absolute w-[80%] sm:w-[40%] md:w-1/2 lg:w-1/4 h-fit overflow-hidden backdrop-blur-sm rounded-2xl">
                {/* <Design/> */}
                {authState === `login` && <Login setAuthState = {setAuthState} onSubmit={async data=>{
                    try{
                        const isValid = data
                        if(isValid){
                            const api = `http://localhost:3000`
                            
                            const res = await fetch(
                                `${api}/api/users/login`
                                ,{
                                method: `POST`,
                                headers: {
                                    'Content-Type': `application/json`
                                },
                                body: JSON.stringify({...data}),
                                credentials: `include`
                            })
                            const d = await res.json()
                            if(d.success){
                                setMessage({message: d.message, type:`info`})
                                nav(`/`)
                            }else{
                                setMessage({message: d.message, type:`error`})
                            
                            }   
                        }                        
                    }catch(err){
                        console.error(err)
                    }
                }}/>}
                {authState === `register` && <Register setAuthState={setAuthState} 
                
                onSubmit={async data=>{
                    try{
                        const isValid = data
                        if(isValid){
                            const api = `http://localhost:3000`
                            const res = await fetch(`${api}/api/users/register`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    ...data
                                }),
                                credentials: 'include' // Send cookies with request
                            })
                            const d = await res.json()
                            if(d.success){
                                nav(`/`)
                            }else {
                                setMessage({message: d.message, type:`info`})
                            }

                        }
                                
                    }catch(err){
                        // console.error(err.message)
                    }
                }} 
                
                />}
                
            </div>
          
        </div>
    )
}



function Design(){
    return (
        <div  className="designs top-0 left-0 w-full h-full absolute ">
            <div className="circle w-50 h-50  blur-2xl bg-indigo-700/20 rounded-full absolute top-4 left-4"></div>
            <div className="circle w-30 h-30 blur-2xl bg-purple-700/20 rounded-full absolute bottom-4 right-4"></div>
            <div className="circle w-90 h-90 bg-cyan-700/10 blur-2xl  rounded-full absolute bottom-0 right-[60px]"></div>
            <div className="circle w-40 h-40 bg-emerald-600/10 blur-2xl  rounded-full absolute top-0 right-[20px]"></div>
        </div>
    )
}
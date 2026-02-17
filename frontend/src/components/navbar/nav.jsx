import {    CircleUserRound, Grip } from 'lucide-react';
export function Navbar({onbarclick = ()=>{}, onprofileclick= ()=>{}}) {
    return (
        <nav
        style={{backgroundImage: `linear-gradient(56deg, #08dcc6, #e73ae7 100%)`}}
        className="navbar rounded-[10rem] w-[90%] p-2 fixed z-10  cursor-pointer top-2 left-1/2 translate-x-[-50%]   bg-gray-800  text-white flex items-center justify-between px-4">
            <div 
            onClick={()=>{
                onbarclick()
            }}
            className="">
                <Grip />
            </div>
            <div className="logo flex items-center justify-between  gap-x-2">
                <div className="w-5 h-5 rounded-[50%] bg-white/20"></div>
                <div className="">Dice</div>
            </div>
            <div 
            className='cursor-pointer'
            onClick={()=>{onprofileclick()}}
            >{<CircleUserRound />}</div>
        </nav>
    )
}
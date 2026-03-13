import {    BellDot, CircleUserRound, Grip } from 'lucide-react';
export function Navbar({onbarclick = ()=>{}, onnotificationclick=()=>{}, onprofileclick= ()=>{}}) {
    return (
        <nav
        style={{
            background: `linear-gradient(white, white) padding-box,
            linear-gradient(to right, transparent, white, transparent) border-box;`,
            // backgroundImage: `linear-gradient(56deg, #08dcc6, #e73ae7 100%)`,
            // borderImage:`linear-gradient(45deg, transparent, white, transparent) 1`,
        }}
        className="navbar  fixed box backdrop-blur-2xl overflow-hidden bg-black/30 z-10 border-white/20 rounded-[10rem] w-[90%] p-1 sm:p-2 sm:px-4   cursor-pointer top-2 left-1/2 translate-x-[-50%]  text-white flex items-center justify-between ">
            <div className="bg w-full h-full absolute z-[-1] top-0 left-0">
                <div className="circle absolute bg-indigo-600/50 w-20 h-20 rounded-full blur-2xl "></div>
                <div className="circle absolute bg-cyan-600/50 w-40 h-40 rounded-full blur-2xl top-2 left-30 "></div>
                <div className="circle absolute bg-green-600/50 w-80 h-70 rounded-full blur-2xl top-4 left-80 "></div>
                <div className="circle absolute bg-violet-900/50 w-30 h-30 rounded-full blur-2xl top-2  right-20 "></div>
            </div>
            <div 
            onClick={()=>{
                onbarclick()
            }}
            className="">
                <Grip size={16} />
            </div>
            <div className="logo flex items-center justify-between  gap-x-2">
                <div className="w-5 h-5 rounded-[50%] bg-white/20"></div>
                <div className="text-[.8rem] sm:text-[.9rem] md:text-[1rem]">Dice</div>
            </div>
            <div className="flex items-center gap-4">
                <div 
                className='cursor-pointer'
                onClick={()=>{onnotificationclick()}}
                >{<BellDot size={16}/>}</div>
                <div 
                className='cursor-pointer'
                onClick={()=>{onprofileclick()}}
                >{<CircleUserRound size={16} />}</div>
            </div>
        </nav>
    )
}
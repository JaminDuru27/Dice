import { LazyMotion, motion } from "framer-motion"
import { AArrowUpIcon, ALargeSmall, Keyboard, KeyboardIcon, LetterText, MoveLeftIcon, Ruler } from "lucide-react"

export function AccesibilityMenu({info, accessibility, setAccessibility}){
    const themes  = [
        {name:`light`, color: `white`}, 
        {name:`dark`, color: `black`}, 
        {name:`normal`, color: `indigo`}
    ]
    return(
        <div className="">
            <div className="theme text-white">
                <div className="title mb-2 capitalize">Theme</div>
                <div className="content flex rounded-2xl gap-2 p-2 border border-white scrollx w-full">
                    {themes.map((theme, k)=>(
                        <motion.div 
                        whileHover={{translateY: -10}}
                        key={`oko93j9d9${k}`}
                        title={`${theme} theme`}
                        style={{background:theme.color}}
                        onClick={()=>{
                            setAccessibility(p=>({...p, theme: theme.name}))
                        }}
                        animate={accessibility.theme === theme.name?{outlineColor: `white`}:{outlineColor:`transparent`}}
                        className="w-5 h-5 sm:w-9 sm:h-9 rounded-full opacity-[1] bg-white/20 border-l-4 border-white outline-4 outline-white outline-offset-2 cursor-pointer "
                        ></motion.div>
                    ))}
                </div>
            </div>
            <div className="options border-2 flex justify-start items-start gap-4 h-fit max-h-40 overflow-y-auto scrolly flex-wrap my-4 border-black/20 rounded-2xl p-4">
                <Btn cb={()=>{
                    setAccessibility(p=>({...p, fontsize: (p.fontsize + 20) % 200,}))
                }} elem={<ALargeSmall size={25}/>}  on={accessibility?.fontsize} name={`font-size`}/>
                <Btn cb={()=>{
                    setAccessibility(p=>({...p, linespacing: (p.linespacing + 20) % 200,}))
                }} elem={<Ruler size={25}/>} on={accessibility?.linespacing} name={`Line Height`}/>

                <Btn cb={()=>{
                    setAccessibility(p=>({...p, fontsize: !p.fontsize}))
                }} elem={<KeyboardIcon size={25}/>} on={accessibility?.keyboardnav} name={`Keyboard navigate`}/>
                <Btn cb={()=>{
                    setAccessibility(p=>({...p, reducedmotion: !p.reducedmotion}))
                }} elem={<MoveLeftIcon size={25}/>} on={accessibility?.reducedmotion} name={`Reduced Motion`}/>
                <Btn cb={()=>{
                    setAccessibility(p=>({...p, dislexicfont: !p.dislexicfont}))
                }} elem={<LetterText size={25}/>} on={accessibility?.dislexicfont} name={`Dislexic`}/>
            </div>
        </div>
    )
}

function Btn({cb, elem, name, on}){
    return (
        <motion.div 
        animate={on?{opacity: 1}:{opacity: 0.5}}
        whileHover={{scale: 1.2}}
        onClick={()=>{cb()}} className="bg-white/50 gap-1 shrink-0 flex-col shadow-2xl cursor-pointer opacity-[.5] rounded-2xl w-15 h-15 sm:w-20 sm:h-20 flex justify-center items-center">
            {elem}
            <div className=" capitalize text-[.7rem] text-center">{name}</div>
        </motion.div>
    )
}
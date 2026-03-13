import emojisdata from "@emoji-mart/data"

export function EmojiMin({list, show, setShow, ref}){
    const emojis = Object.values(emojisdata.emojis)
    const posx = ()=>
        show?.dir === `right`?
        `${ref[`current`]?.getBoundingClientRect()?.x -400}px`
        :`${ref[`current`]?.getBoundingClientRect()?.x + 120}px`;
    const posy = ()=>
        `${ref[`current`]?.getBoundingClientRect()?.y}px`
    return (
    <motion.div
    animate={show?{opacity: [0, 1], display:`flex`}:{opacity:[1,0], display: `none`}} 
    style={{top: posy(), left: posx()}}
    className="absolute z-30 top-0 left-0">
        <motion.div 
        className=" rounded-2xl p-2 flex gap-1">
            {emojis.slice(0, 80).filter(e=>{
                if(list.includes(e.id))
                    return e
                else return undefined
            }).map((emoji, k) =>{
                if(emoji)
                return (
                <motion.span
                initial={{translateY: show.dir === `left`?-10:10}}
                animate={{translateY:0}}
                transition={{delay: k * 0.02}}
                
                className="bg-black/10 border backdrop-blur-2xl w-7 h-7 rounded-full flex justify-center items-center border-white/10"
                key={emoji.id + `92d8h28dn20j[d]`}
                onClick={() => {show.cb(emoji.skins[0].native);setShow(null)}}
                >
                {emoji.skins[0].native}
                </motion.span>
                )
                else return <></>
            })}
        </motion.div>
    </motion.div>

    )
}
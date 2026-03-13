
import { motion } from "framer-motion";
import { Cloud, DoorClosedIcon, DoorOpenIcon, PlusIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FetchWeather } from "../../../utils/fetchweather";
import { useNavigate } from "react-router-dom";

export function ProjectList({d,setD, profile}){
    const nav = useNavigate()
    return (
        <motion.div 
        animate={(d?.name === `projects`)?{opacity: [0,1,], translateX: [-50, 5], display: `block`}:{opacity: [1, 0], translateX: [5, -50], display: `none`}}
        style={{boxShadow: `2px 2px 24px -7px black`, display:`none`}}
        className="w-[40%] opacity- sm:w-1/4 p-2 md:w-1/4 lg:w-1/6 border border-white/20  rounded-sm bg-white/2 text-white backdrop-blur-2xl h-[90vh] fixed top-1/2 translate-y-[-50%] left-0 z-10">
            <motion.div 
            onClick={()=>{setD(false)}}
            className="exit absolute top-0 w-7 h-7  right-0 translate-x-[120%] flex justify-center items-center bg-white/30 p-2 rounded-full backdrop-blur-3xl  translate-y-[50%] cursor-pointer "
            >{<DoorOpenIcon className="w-full h-full text-white"/>}</motion.div>
            
            <Weather/>
            
            <div className="list text-[.7rem] flex flex-col gap-2">
                {
                    (profile?.projects || []).map((project, k)=>{
                        const date = new Date(project.createdAt)
                        const day = date.toLocaleString('default', { weekday: 'long' });
                        return (
                            <List 
                            cb={()=>{
                                console.log(project)
                                nav(`/todo?name=${project.name} &id=${project.projectId}`)
                            }} 
                            name={project.name} day={day} key={k} id={project.projectId}/>
                        )
                    })
                }
                <div 
                
                onClick={()=>{
                    nav('/')
                }}
                className="w-full border flex justify-center items-center gap-2 mt-4  border-white rounded-sm p-2">
                Add {<PlusIcon/>}</div>
            </div>
        </motion.div>
    )
}

export function List({cb = ()=>{}, name, day, key,}){
    return (
        <motion.div 
        key={`88882hhhbegevebeg${key}`}
        onClick={(e)=>{
            cb()
        }}
        className="w-full cursor-pointer border border-white rounded-sm p-2 py-1 sm:py-2 ">
            <div className="day text-amber-500">{day}</div>
            <div className="title">{name}</div>
        </motion.div>
    )
}
export function Weather({temperature = 30, condition = `Sunny`, date = `Friday Feb, 2026`}){
    const [data, setData] = useState(null)
    useEffect(()=>{
        const date = new Date()
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate()
        const year = date.getFullYear()
        if(navigator?.geolocation?.getCurrentPosition)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            FetchWeather({lat: latitude, lon: longitude})
            ?.then((data)=>{
                if(!data)return
                const iconCode = data?.weather?.weather[0]?.icon
                setData(p=>({
                ...p,
                weather: {...data?.weather, imgurl: `http://openweathermap.org/img/wn/${iconCode}@2x.png`},
                }))
            })        
        });
        else {
            FetchWeather()?.then(data=>{
                const iconCode = data?.weather?.weather[0]?.icon
                setData(p=>({
                ...p,
                weather: {...data?.weather, imgurl: `http://openweathermap.org/img/wn/${iconCode}@2x.png`},
                }))
            })
        }
                
        setData({temp_c: `temperature`, text:``, condition:``, date: `${month} ${day}, ${year}`}) 

    },[])
    if (data) return (
        <div className="weather  flex justify-between items-center mb-4 gap-2">
            <div className="sunny w-7 h-7 justify-center bg-white/20 p-2 rounded-full items-center flex ">{<Cloud size={20}/>}</div>
            <div className="descr text-[.4rem] sm:text-[.7rem]  md:text-[.8rem] lg:text-[.7rem]">
                <div className="temp flex items-center gap-1 capitalize ">
                    <div className="flex items-center gap-1 ">{data?.weather?.weather[0]?.description} 
                        <img className="w-5 h-5 sm:w-8 sm:h-8 md:w-15 md:w-15" src={data?.weather?.imgurl} alt="Weather icon" />
                        {/* {<SunIcon size={12}/>} */}
                    </div>
                    <div className="flex items-center gap-1 ">{data?.weather?.main?.temp}C</div>
                </div>
                <div className="date capitalize ">{data?.date}</div>
            </div>
        </div>
    )
    else return null
}
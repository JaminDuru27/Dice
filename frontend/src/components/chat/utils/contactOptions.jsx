import { Delete, DoorOpen, Eraser, HistoryIcon, Image, Library, Search, Share2, Sun, TimerIcon, TimerOff } from "lucide-react";

export const chatoptions = ({sharecontactcb, unfriendcb, themecb, searchcb, dissapearingmessagecb, chatinfocb, clearchatcb})=>([

{
    title: `share`,icon: Share2,
    cb:sharecontactcb
},
{
    title: `theme`,icon: Image,
    cb:themecb
},
{
    title: `search`,icon: Search,
    cb:searchcb
},
{
    title: `chat info`,icon: Library,
    cb:chatinfocb
},
{
    title: `dissapearng messages`,icon: HistoryIcon,
    cb:dissapearingmessagecb, 
},
{
    title: `clear chat`,icon: Delete,
    cb:clearchatcb, color:`amber-500`
},

{
    title: `unfriend`,icon: DoorOpen,
    cb:unfriendcb, color:`red-500`
},

])
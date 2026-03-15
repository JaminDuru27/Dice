import { Delete, DoorOpen, Eraser, HistoryIcon, Image, Library, Search, Share2, Sun, TimerIcon, TimerOff } from "lucide-react";

export const groupoptions = ({leavegroupcb, sharegroupcb, themecb, searchcb, groupinfocb, dissapearingmessagecb, clearchatcb})=>([

{
    title: `share group`,icon: Share2,
    cb:sharegroupcb
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
    title: `group info`,icon: Library,
    cb:groupinfocb
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
    title: `leave group`,icon: DoorOpen,
    cb:leavegroupcb, color:`red-500`
},

])
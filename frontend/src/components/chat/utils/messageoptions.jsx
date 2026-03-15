import { Delete, Edit2, Forward, MessageCircle, Smile, SmileIcon, Trash } from "lucide-react"

export const messageoptions = ({editcb ,deletecb,unreactcb, forwardcb, privatechatcb})=>([
{
    title: `Edit`,icon: Edit2,
    cb:editcb

},

{
    title: `Delete`,icon: Trash,
    color: `red-500`, cb:deletecb

},
{
    title: `Unreact`,icon: SmileIcon,
        cb:unreactcb

},
{
    title: `forward`,icon: Forward,
    cb:forwardcb,
},
{
    title: `chat privately`,icon: MessageCircle,
    cb:privatechatcb
},
])
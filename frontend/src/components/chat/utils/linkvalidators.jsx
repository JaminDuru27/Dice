import { specialId } from "../../sidebar/groups/groups"

function getOp(message){
    const split = message.split(`-`)
    const id = split[0]
    if(id !== specialId)return false
    const op = split[1]
    return op
}
export function isGroupLink(message){
    const op = getOp(message)
    if(!op)return
    const dataId = message.split[2]
    if(op === `DG`)return {status:true, dataId:dataId} 
    else return false
}
export function isContactLink(message){
    const op = getOp(message)
    if(!op)return
    const dataId = message.split[2]
    if(op === `DC`)return {status:true, dataId:dataId} 
    else return false
}
export function isVoteTodoLink(message){
    const op = getOp(message)
    if(!op)return
    const dataId = message.split[2]
    if(op === `DGM`)return {status:true, dataId:dataId} 
    else return false
}
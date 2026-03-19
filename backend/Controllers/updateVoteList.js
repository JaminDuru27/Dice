import { Conversation } from "../Models/conversationModel.js"

export async function UpdateVoteList(req, res){
    const {data, convoId, listId} = req.body
    const userId = req.user.userId
    console.log(convoId,listId)
    try{
        let convo = await Conversation.updateOne(
            {
                _id: convoId,
                "list._id": listId,
                "list.votingList.from": userId
            },
            {
                $set: {
                "list.$[l].votingList.$[v].text": data
                }
            },
            {
                arrayFilters: [
                { "l._id": listId },
                { "v.from": userId }
                ]
            }
        ) 
        if (convo.modifiedCount === 0) {
        convo  = await Conversation.updateOne(
            { _id: convoId },
            {
            $push: {
                "list.$[l].votingList": {
                from: userId,
                text: data
                }
            }
            },
            {
            arrayFilters: [{ "l._id": listId }]
            }
        )
        }
        if(convo){

            res.status(200).json({
                message: `FeedBack saved`,
                success: true,
                data: convo
            })
        }else {
            res.status(500).json({
                message: `Something went wrong`,
                success: true,
            })
        }
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message: ``,
            success: true,
        })
    }
}
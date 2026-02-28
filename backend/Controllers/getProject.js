import { User } from "../Models/user.js"

export async function GetProject(req,res){
    try {
        let {projectId} = req.body
        projectId = projectId.trim()
        const userId = req.user.userId
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const project = user.projects.find(p => p.projectId === projectId)
        if (!project) {
            return res.status(404).json({ error: "Project not found" })
        }
        res.status(200).json({ 
            success: true,
            message: "Project retrieved successfully",
            project: project
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }  
} 
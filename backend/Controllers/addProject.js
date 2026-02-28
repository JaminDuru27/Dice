import { User } from "../Models/user.js";

export async function AddProject(req, res){
    try {
        const {project } = req.body;
        if(!project){
            return res.status(400).json({ error: "Project name is required" });
        }
        const userId= req.user.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.projects.push(project);
        await user.save();
        res.status(200).json({ success:true, message: "Project added successfully", projects: user.projects });
    } catch (error) {   
        res.status(500).json({ success:false, message: error.message });
    }
}
export async function GetProject(id) {
    const api = `http://localhost:3000`
    try{
        const res = await fetch(`${api}/api/users/getproject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({projectId: id}),
            credentials: 'include' // Send cookies with request
        })
        const d = await res.json()
        if(d.success){
            return d
        }else {
            console.error(d.message)
        }
    }
    catch(err){
        console.error(err)
    }
}
export async function AddProject(setMessage,data, location, type){
    const api = `http://localhost:3000`
    try{
        const res = await fetch(`${api}/api/users/Users`, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:{...data}, location, type}),
            credentials: 'include' // Send cookies with request
        })
        const d = await res.json()
            console.log(d)

        if(d.success){
            return d
        }else {
            setMessage({message: d.message, type: `error`}) 
            console.error(d.message)
        }
    }
    catch(err){
        console.error(err)
    }
}
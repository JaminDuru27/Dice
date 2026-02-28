export async function UpdateSettings(data,location,){
    const api = `http://localhost:3000`
    try{
        const res = await fetch(`${api}/api/users/Users/${location}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data}),
            credentials: 'include' // Send cookies with request
        })
        const d = await res.json()
        if(d.success){
            return d.data
        }else {
            console.error(d.message)
        }
    }
    catch(err){
        console.error(err)
    }
}
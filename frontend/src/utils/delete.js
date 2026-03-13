export async function Patch(setMessage, data, location, type, arrayFilters = []){
    const api = `http://localhost:3000`
    try{
        const res = await fetch(`${api}/api/users/Users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data, location, type, arrayFilters}),
            credentials: 'include' // Send cookies with request
        })
        const d = await res.json()
        if(d.success){
            return d.data
        }else {
            setMessage({message: d.message, type: `error`})
        }
    }
    catch(err){
        setMessage({message: err.message, type: `error`})
    }
}
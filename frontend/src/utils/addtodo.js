export async function addTodo(data){
    const api = `http://localhost:3000`
    try{
        const res = await fetch(`${api}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
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
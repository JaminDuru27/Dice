export async function FetchWeather(data){
    try{
        const api = `http://localhost:3000`
        const url = `${api}/api/users/weather${data?`?lonp=${data.lon}&latp=${data.lat}`:``}`
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Send cookies with request 
        })
        if (!res.ok) {
            const text = await res.text()
            console.log(text)
            return false
        }
        const d = await res.json()
        if(d.success){
            return d.data
        }else {
            console.error(d.message)
        }
    }catch(err){
        console.error(err)
    }
} 
export function FetchWeather(){
    try{
        const api = `http://localhost:3000`
        console.log(`Fetching weather data...`)
        const res = fetch(`${api}/api/weather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Send cookies with request 
        })
        const data = res.json()
        return data
    }catch(err){
        console.error(err)
    }
} 
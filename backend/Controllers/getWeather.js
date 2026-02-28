import  nodefetch from 'node-fetch'
export async function GetWeather(req, res){
    try{
        console.log(`Fetching weather data...`)
        // const res = await nodefetch("https://ipapi.co/json/");
        // const location = await res.json();
        // console.log(location);
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
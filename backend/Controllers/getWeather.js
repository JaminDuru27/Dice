import dotenv from 'dotenv'
dotenv.config()
import  fetch from 'node-fetch'

export async function GetWeather(req, res){
    try{
        const {lonp, latp} = req.query
        const ip = await fetch("https://ipapi.co/json/");
        const location = await ip.json();
        const lon= lonp ?? location.longitude
        const lat= latp ?? location.latitude
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)
        const weatherData = await weather.json()
        res?.status(200)?.json({
            success: true,
            data: {
                weather: weatherData,
                location: {
                    city: location.city,
                    region: location.region,
                    country: location.country_name,
                    timezone: location.timezone,
                    lat,
                    lon
                },
            }
        })
    }
    catch(err){
        res?.status(500)?.json({
            success: false,
            message: err.message
        })
    }
}
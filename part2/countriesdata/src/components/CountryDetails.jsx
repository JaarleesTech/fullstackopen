import { useState, useEffect } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_API_KEY

const CountryDetails = ({country}) => {
    const [weather, setWeather] = useState(null)

    const languagesArray = country.languages 
        ? Object.values(country.languages) 
        : []

    const capital = country.capital?.[0] ?? null

    useEffect(() => {
        if(!capital) {
            setWeather(null)
            return
        }
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
            )
            .then(response => {
                setWeather(response.data)
            })
            .catch((error) => {
                console.error('Error Fetching Weather', error)
                setWeather(null)
            })
    }, [capital])

  return (
    <div>
            <h2> {country.name.common} </h2>
            <p> Capital: {capital ?? "N/A"} </p>
            <p> Area: {country.area} km<sup>2</sup> </p>

            <h2> Languages </h2>
            <ul>
              {languagesArray.length > 0 ? (
                languagesArray.map(language => (
                    <li key={language}> {language} </li>
                )) 
             ) : (
                    <li> No official languages listed </li>
             )}
            </ul>
            <img 
                src={country.flags.svg}
                alt={country.flags.alt || `Flag of ${country.name.common}`} 
                width="150"
            />
            {!capital ? (
                <p>No capital available for weather data.</p>
            ) : weather ? (
                <div> 
                    <h2> Weather in {capital} </h2>
                    <p> Temperature {weather.main.temp} Celcius </p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                    <p> Wind {weather.wind.speed} m/s </p>
                </div> 
                ) : (
                    <p> Loading weather data... </p>
                )
            }
        </div>
  )
}

export default CountryDetails
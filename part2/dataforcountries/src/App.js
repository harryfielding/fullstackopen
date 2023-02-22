import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries, filter, setFilter, weatherData }) => {

  const showCountry = (country) => {
    return () => {
      setFilter(country)
    }
  }

  if (countries.filter(country => country.name.common === filter).length === 1 || countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <ul>
          <li>Capital: {countries[0].capital[0]}</li>
          <li>Area: {countries[0].area}km²</li>
        </ul>
        <h2>Languages:</h2>
        <ul>
          {Object.values(countries[0].languages).map(value => <li key={value}>{value}</li>)}
        </ul>
        <h2>Flag:</h2>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        <Weather weatherData={weatherData} country={countries[0]} />
      </div>
    )
  } else if (countries.length > 10) {
    return <div>Too many matches; specify another filter</div>
  } else if (countries.length > 1) {
    return <div>{countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={showCountry(country.name.common)}>show</button></p>)}</div>
  } 
}

const Weather = ({ weatherData, country }) => {
  if (Object.keys(weatherData).length === 0) {
    return null
  }
  return (
    <div>
      <h2>Weather in {country.capital[0]}:</h2>
      <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} />
      <p>{weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1)}</p>
      <ul>
        <li>Temperature: {Math.round((weatherData.current.temp-273.15) * 100) / 100}°C (feels like {Math.round((weatherData.current.feels_like-273.15) * 100) / 100}°C)</li>
        <li>Wind speed: {weatherData.current.wind_speed}</li>
      </ul>
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    })
  }, [filter])

  useEffect(() => {
    if(countries.length === 1) {
      axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${countries[0].capitalInfo.latlng[0]}&lon=${countries[0].capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherData(response.data)
      })
    }
  }, [countries])

  const filterChanged = event => setFilter(event.target.value)

  return (
    <div>
      search: <input onChange={filterChanged} />
      <Country countries={countries} setFilter={setFilter} filter={filter} weatherData={weatherData} />
    </div>
  );
}

export default App;
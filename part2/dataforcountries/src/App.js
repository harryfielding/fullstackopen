import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries, filter, setFilter }) => {
  const showCountry = (country) => {
    return () => {
      setFilter(country)
    }
  }

  if (countries.filter(country => country.name.common === filter).length === 1) {
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
      </div>
    )
  } else if (countries.length > 10) {
    return <div>Too many matches; specify another filter</div>
  } else if (countries.length > 1) {
    return <div>{countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={showCountry(country.name.common)}>show</button></p>)}</div>
  } 
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    })
  }, [filter])

  const filterChanged = event => setFilter(event.target.value)

  return (
    <div>
      search: <input onChange={filterChanged} />
      <Country countries={countries} setFilter={setFilter} filter={filter}/>
    </div>
  );
}

export default App;
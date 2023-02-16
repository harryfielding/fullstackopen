import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches; specify another filter</div>
  } else if (countries.length > 1) {
    return <div>{countries.map(country => <p key={country.name.common}>{country.name.common} <br /></p>)}</div>
  } else if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <ul>
          <li>Capital: {countries[0].capital[0]}</li>
          <li>Area: {countries[0].area}km²</li>
        </ul>
        <h2>Languages:</h2>
        <ul>
          {Object.keys(countries[0].languages).map(key => <li key={countries[0].languages[key]}>{countries[0].languages[key]}</li>)}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </div>
    )
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
      <Country countries={countries} />
    </div>
  );
}

export default App;

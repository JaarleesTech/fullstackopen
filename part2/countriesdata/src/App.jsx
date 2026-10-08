import { useEffect, useState } from "react"
import axios from 'axios'
import CountryDetails from "./components/CountryDetails"

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(query.toLowerCase())
  })
  
  const handleQuery = (event) => {
    setQuery(event.target.value)
    setSelectedCountry(null)
  }

  const renderContent = () => {
    if(selectedCountry) return <CountryDetails country = {selectedCountry} />
    if(!query) return null
    if(filteredCountries.length > 10) return 'Too many matches. Specify another filter'
    if(filteredCountries.length === 1) return <CountryDetails country={filteredCountries[0]} />
    if(filteredCountries.length === 0) return 'No matches found'

    return filteredCountries.map(country => (
        <div key={country.cca2}>
             <span> {country.name.common} </span>
             <button onClick={() => setSelectedCountry(country)}> Show </button>
          </div>
    ))
  }
 
  return (
    <div>
         find countries <input value={query} onChange={handleQuery}/>
       <div>
          { renderContent() } 
       </div>
    </div>
  )
}

export default App
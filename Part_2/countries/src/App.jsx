import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from "./components/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const normalizeName = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

    //Filter contacts based on filterName state. If filterName is empty, show all contacts.
  const countriesToShow = (!filterValue.trim())
  ? countries
  : countries.filter(country =>
      normalizeName(country.name.common).includes(normalizeName(filterValue)) ||
      normalizeName(country.name.official).includes(normalizeName(filterValue)) )

  const handleFilterNameChange = (event) => {
    setFilterValue(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = id => {
      const country = countries.find(country => country.cca2 === id)
      setSelectedCountry(country)
  }

  return (
    <div>
      <form>
        Find countries: <input value={filterValue} onChange={handleFilterNameChange} />
      </form>
      {selectedCountry ? (
        <Country country={selectedCountry} />
      ) : (
        <Countries countries={countriesToShow} handleShowCountry={handleShowCountry} />
      )}
    </div>
  )
}

export default App
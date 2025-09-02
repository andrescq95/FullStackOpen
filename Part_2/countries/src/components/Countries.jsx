import Country from "./Country"

const Countries = ({ countries, handleShowCountry }) => {
    if (countries.length === 250) {
      return
    }
    else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length < 10 && countries.length > 1) {
      return (
        <>
          {countries.map(country =>
            <div key={country.cca2}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country.cca2)}> Show</button>
            </div>
          )}
        </>
      )
    }
    else if (countries.length === 1) {
      const country = countries[0]
      return (
        <>
          <Country country={country} />
        </>
      )
    }
}

  export default Countries
const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages:</h2>
            <ul>
            {Object.values(country.languages).map(language =>
                <li key={language}>{language}</li>
            )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>Weather in {country.capital}</h2>
            <div>Temperature: </div>
            <div>Wind: </div>
            <div>Weather icon</div>
        </div>
    )
}

  export default Country
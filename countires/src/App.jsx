import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [allCountires, setAllCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');

  useEffect(() => {
    axios('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
      })
  }, []);

  const handleCountryChnage = (event) => {
    console.log(event.target.value);
    setNewCountry(event.target.value);

  }

  const filterCountry = allCountires.filter(country =>
      country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  )

  return (
    <>
      <div>
        find countries
        <input value={newCountry}
          onChange={handleCountryChnage}
        />
        {(() => {
          if (filterCountry.length > 10) {
          return <p>Too many matches, specify another filter</p>;
        }
        if (filterCountry.length > 1) {
          return (
            <ul>
              {filterCountry.map(c => (
                <li key={c.name.common}>{c.name.common}</li>
              ))}
            </ul>
          );
        }

        if (filterCountry.length === 1) {
          const c = filterCountry[0];
          return (
            <div>
              <h2>{c.name.common}</h2>
              <p>capital: {c.capital}</p>
              <p>area: {c.area}</p>
              <img src={c.flags.png} width="150" />
            </div>
          );
        }

        return null;
        })()}
      </div>
    </>
  )
}

export default App

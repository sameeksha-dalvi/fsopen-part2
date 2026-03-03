import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [allCountires, setAllCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);


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

   const countriesToDisplay = selectedCountry 
    ? [selectedCountry] 
    : filterCountry;
  

  return (
    <>
      <div>
        find countries
        <input value={newCountry}
          onChange={handleCountryChnage}
        />
        {(() => {
          if (countriesToDisplay.length > 10) {
          return <p>Too many matches, specify another filter</p>;
        }

        if (countriesToDisplay.length > 1) {
          return (
            <ul>
              {countriesToDisplay.map(c => (
                <li key={c.name.common}>
                  {c.name.common} 
                  <button onClick={() => setSelectedCountry(c)}>
                    show
                  </button>
                </li>
              ))}
            </ul>
          );
        }

        if (countriesToDisplay.length === 1) {
          const c = countriesToDisplay[0];
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

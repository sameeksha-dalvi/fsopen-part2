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

  return (
    <>
      <div>
        find countries
        <input value={newCountry}
          onChange={handleCountryChnage}
        />

      </div>
    </>
  )
}

export default App

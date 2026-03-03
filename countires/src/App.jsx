import { useState } from 'react'

function App() {
  
  const [newCountry, setNewCountry] = useState('');

  const handleCountryChnage = (event) =>{
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

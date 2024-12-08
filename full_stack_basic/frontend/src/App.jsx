import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [cars,setcars] = useState([]); 

  useEffect(() => {
    // axios auto handel parsing of string into json data or others
    axios.get("/api/cars")
    .then((response)=> {
      setcars(response.data)
    })
  })

  return (
    <>
      <h1>AMAN WITH BASIC FULL STACK</h1>
      <p>Luxury Cars : {cars.length}</p>
      {
        cars.map((car,index)=> (
          <div key={car.id}>
            <h3><u>{car.title}</u></h3>
            <p><h2>{car.content}</h2></p>
          </div>
        ))
      }
    </>
  )
}

export default App


// axios is specially written for web requests
// watching for most common bad practice in projects 
// video from 2:00:00 se 2:10:17 
// fayda ye hota hai ke cost bchjate hai piplines ke lekin  
// frontend me data show hone me problem hota hai 
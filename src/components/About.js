import { API } from 'aws-amplify'
import React, { useState } from 'react'

const myAPI = "retsapi"
const path = '/zips'; 

const About = () => {
  const [input, setInput] = useState("")
  const [zips, setzips] = useState([])

  //Function to fetch from our backend and update zips array
  function getzip(e) {
    let zip = e.input
    API.get(myAPI, path + "/" + zip)
       .then(response => {
         console.log(response)
         let newzips = [...zips]
         newzips.push(response)
         setzips(newzips)

       })
       .catch(error => {
         console.log(error)
       })
  }

  return (
    
    <div>
      <h1>Connecting to API</h1>
      <div>
          <input placeholder="zip id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getzip({input})}>Get zip From Backend</button>

      <h2 style={{visibility: zips.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       zips.map((thiszip, index) => {
         return (
        <div key={thiszip.zip}>
          <span><b>zip:</b> {thiszip.zip} - <b>zipName</b>: {thiszip.locationName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default About;
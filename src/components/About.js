import { API } from 'aws-amplify'
import React, { useState } from 'react'

const myAPI = "retsapi"
const path = '/zips'; 

let labels = []
let zhvi = []

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
         fillData(newzips[0])
       })
       .catch(error => {
         console.log(error)
       })
  }



  function fillData(payload) {
    for (const obj of payload) {
      labels.push(obj.Date);
      zhvi.push(obj.ZHVI)
    }
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
      
      {zhvi.map(entry => <b key={entry}>{entry}</b>)}

      </div>
  )
}

export default About;
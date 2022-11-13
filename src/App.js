import LineChart from "./components/LineChart";
import React, {useState} from "react";
import Navbar from "./components/Navbar";


function App() {

  const [input, setInput] = useState("");

  let locations = [
    {name: "cold spring, NY 10516", zip: '10516'},
    {name: "bing", zip: '13901'},
    {name: "bev", zip: '90210'}
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  if(input.length > 0) {
    locations = locations.filter((i) => {
      return (i.name.match(input)); //|| i.zip.match(input));   // do full name in single var
    })
  }

  return (
    <div>
      <Navbar/>
      <div id="search">
        <input 
          type="text"
          id="searchbar"
          placeholder="Search locations"
          onChange={handleChange}
          value={input}/>
        {locations.map((location, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  {location.name} - {location.zip}
                </li> 
              </ul>
            </div>
          )
        })}
      </div>
    <div id="chart"> 
      <LineChart/>
    </div>
  </div>
  )  
}

export default App;
import React, {useState } from "react";
import LineChart from "./LineChart";

function Home() {

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
            <div id="searchSpace">
                <div id="search">
                    <input 
                        id="searchBar"
                        size="24"
                        type="text"
                        placeholder="Search locations"
                        onChange={handleChange}
                        value={input}/>
                    {locations.map((location, index) => {
                        return (
                            <div key={index} id="searchResults">
                                <ul>
                                    <li>
                                        {location.name} - {location.zip}
                                    </li> 
                                </ul>
                            </div>
                         )
                        })} 
                </div>
            </div>
            <div id="chartSpace">
                <div id="chart"> 
                    <LineChart/>
                </div>
            </div>   
        </div>
    )
}

export default Home
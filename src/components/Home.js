import React, {useState } from "react";
import LineChart from "./LineChart";
var locations = require("./locations.json")

function Home() {

    const [input, setInput] = useState("");

  
    const handleChange = (e) => {
      e.preventDefault();
      setInput(e.target.value);
    };

    const onSearch = (searchTerm) => {
        setInput(searchTerm);
        // our api to fetch the search result
        console.log("search ", searchTerm);
      };

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

                    <button onClick={() => onSearch(input)}> Search </button>
                
                    <div id="dropdown">
                        {locations.filter(item => {
                            const searchTerm = input.toLowerCase();
                            const location = item.Location.toLowerCase();

                            return (
                                searchTerm && 
                                location.startsWith(searchTerm) &&
                                Location !== searchTerm
                            );
                        })
                        .slice(0, 10)
                        .map((item) => ( 
                            <div className="dropdown-row"
                            onClick={() => onSearch(item.Location)}
                            key={item.ZipCode}
                            >
                                {item.Location}  
                            </div>))}
                    </div>
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
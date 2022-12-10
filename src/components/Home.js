import React, { useState, useEffect, createContext } from "react";
import LineChart from "./LineChart";
import { API } from 'aws-amplify';
var locations = require("./locations.json")

const myAPI = "retsapi";
const path = '/zips'; 

export const timeseries = createContext();

const ts = {"labels": [],
            "zhvi": []}

function Home() {

    const [input, setInput] = useState("");

    const [isRendered, setRender] = useState(false);

    const [zips, setzips] = useState([]);

    useEffect(() => {
        try {
            ts.labels = []
            ts.zhvi = [] 
             for (const obj of zips.slice(-1)[0]) {
                ts.labels.push(obj.Date.slice(0,10));
                ts.zhvi.push(obj.ZHVI);
            }
            setRender(true)
            }
        catch (e) {
            console.log(e)
        }
    }, [zips]);

  
    const handleChange = (e) => {
      e.preventDefault();
      setInput(e.target.value);
    };

    const onSearch = (searchTerm) => {
        setInput(searchTerm);
        setRender(false)
        let zip = searchTerm.slice(-5);
        API.get(myAPI, path + "/" + zip)
           .then(response => {
             let newzips = [...zips]
             newzips.push(response)
             setzips(newzips)
           })
           .catch(error => {
             console.log(error)
           })

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
                    <timeseries.Provider value = {ts}>
                        {isRendered && <LineChart/>}
                    </timeseries.Provider>
                </div>
            </div>   
        </div>
    )
}

export default Home
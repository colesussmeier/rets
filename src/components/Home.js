import React, { useState, useEffect, createContext } from "react";
import { API } from 'aws-amplify';
import Dashboard from "./Dashboard";
var locations = require("../assets/locations.json")


const myAPI = "retsapi";
const path = '/zips'; 

export const timeseries = createContext();


const ts = {"zhvi": {},
            "list": {},
            "sale": {},
            "inventory": {},
            "listings": {},
            "homes": {},
            //"zhvf": {},
            "name": ""}

function Home() {

    const [input, setInput] = useState("");

    const [isRendered, setRender] = useState(false);

    const [zips, setzips] = useState([]);


    useEffect(() => {
        try {
            ts.zhvi = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.zhvi);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

            ts.list = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.MedianListPrice);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

            ts.sale = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.MedianSalePrice);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

            ts.inventory = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.Inventory);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

            ts.listings = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.NewListings);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

            ts.homes = zips.slice(-1)[0].map(item => {
                const parsed = parseInt(item.HomesSold);
                return {
                    x: new Date(item.Date).getTime(),
                    y: isNaN(parsed) ? null : parsed,
                }
              });

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
        ts.name = searchTerm;
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

           setInput("");

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
                 <div id="titleSpace"><h1>{ts.name}</h1></div>
            <div id="chartSpace">
                <div id="chart"> 
                    <timeseries.Provider value = {ts}>
                        {isRendered && <Dashboard/>}
                    </timeseries.Provider>
                </div>
            </div> 
            <div id="heroSection">
                <div id="leftHero"> </div>
                <div id="rightHero"> </div></div> 
        </div>
    )
}

export default Home
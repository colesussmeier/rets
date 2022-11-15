import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import ErrorPage from "./components/ErrorPage";

function App() {

  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Blog" element={<Blog/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </div>
  )  
}

export default App;
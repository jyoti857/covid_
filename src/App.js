import React, {useState} from 'react';
import './App.css';
import Home from './Routes/Home';
import { NavLink, BrowserRouter as Router, Link, Route } from 'react-router-dom';


function App(props){
  console.log("______________. ", props);
  return(
    <div>
      <Router>
        {/* <NavLink to  = '/'>Home</NavLink> */}
        <Route path = '/'><Home /></Route>
      </Router>
      
    </div>
  )
}

export default App;

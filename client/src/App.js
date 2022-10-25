import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import AddActivity from "./components/AddActivity/AddActivity"

function App() {
  
     return (
      <BrowserRouter>
    <div className="App">
      <Route exact path={"/"} component={LandingPage}></Route>
      <Route exact path={"/home"} component={Home}></Route>
      <Route exact path={"/detail/:id"} component={Details}></Route>
      <Route exact path={"/activities"} component={AddActivity}></Route>
    </div>
    </BrowserRouter>
  );
  
 
}

export default App;

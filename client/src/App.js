import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from 'react-router-dom';
import {AuthContext} from "./authentication/auth";
import SignUp from './components/SignUp';
import Login from "./components/Login";
import Home from "./components/Home";
import AccountPage from "./components/Account";
import DashboardPage from "./components/Dashboard";
import Projects from "./components/Projects";


function App() {
    const [authToken, setAuthToken] = useState(false);



  return (
      <AuthContext.Provider value={{authToken, setAuthToken}}>
          <Router>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/sign-up" component={SignUp}/>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/account" component={AccountPage}/>
                      <Route exact path="/projects" component={Projects}/>
                      <Route exact path="/dashboard" component={DashboardPage}/>
                  </Switch>
              </div>
          </Router>
      </AuthContext.Provider>


  );
}

export default App;

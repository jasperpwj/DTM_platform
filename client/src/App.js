import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import {AuthContext} from "./authentication/auth";
import SignUp from './components/SignUp';
import Login from "./components/Login";
import Home from "./components/Home";
import AccountPage from "./components/Account";
import DashboardPage from "./components/Dashboard";
import Projects from "./components/Projects";
import TopNavBar from "./components/navigation/TopNavBar";
import Project from "./components/Project";
import NotFoundPage from "./components/NotFoundPage";
const authService = require("./services/auth.service");


function App() {
    const currentUser = authService.getCurrentUser();
    console.log("App.js")
    console.log(currentUser);
    const [authToken, setAuthToken] = useState(!!(currentUser && currentUser.accessToken));

    useEffect(() => {

    }, [authToken]);

  return (
      <AuthContext.Provider value={{authToken, setAuthToken}}>
          <Router>
                  {authToken? (
                      <div className="App">
                          <TopNavBar/>
                          <Switch>
                              <Route exact path="/" component={Home}/>
                              <Route exact path="/account" component={AccountPage}/>
                              <Route exact path="/projects" component={Projects}/>
                              <Route exact path="/dashboard" component={DashboardPage}/>
                              <Route exact path='/projects/:projectName' component={Project}/>
                          </Switch>
                      </div>):(
                      <div className="App">
                          <Switch>
                              <Route exact path="/" component={Home}/>
                              <Route exact path="/sign-up" component={SignUp}/>
                              <Route exact path="/login" component={Login}/>
                          </Switch>
                      </div>
                  )}
                  <Route path="*" component={NotFoundPage}/>
          </Router>
      </AuthContext.Provider>


  );
}

export default App;

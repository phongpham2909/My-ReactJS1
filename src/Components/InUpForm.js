import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import '../App.css';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {logged: false};

    let session = this.getSession();
    if(session !== null)
    {
            this.state.logged = true;
    }

  }
  componentDidMount()
  {
    if (this.state.logged === true) {
      if (window.location.pathname !== "/sign-up") {
        window.location.href = "/sign-up";
      }
    }
  }

  getSession()
  {
    let session = window.localStorage.getItem("session");
    if(session != null)
    {
      return JSON.parse(session);
    }
    return null;
  }
    render() {
      if(this.state.logged === true)
      {
        return (<div></div>)
      }
      return (
        <Router>
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form"> 
          
            <div className="PageSwitcher">
            <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>
  
            <div className="FormTitle">
            <NavLink to="/sign-in"  activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
            <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
     
            <Route exact path="/sign-up" component={SignUpForm}/>             
            <Route path="/sign-in" component={SignInForm}/>
                
          </div>
        </div>
        </Router>
      );
    }
  }
  
  export default AppRouter;
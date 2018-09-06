import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Row, Col, Grid } from 'react-bootstrap';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import '../App.css';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false };

    let session = this.getSession();
    if (session !== null) {
      this.state.logged = true;
    }
  }
  getSession() {
    let session = window.localStorage.getItem("session");
    if (session != null) {
      return JSON.parse(session);
    }
    return null;
  }
  render() {
    if (this.state.logged === true) {
      return (<div></div>);
    }
    return (
      <Router>
        <Grid fluid={true}>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Row className="App">
                <Col xsHidden={true} smHidden={true} md={6} lg={6} className="App__Aside">
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} className="App__Form">
                  <div className="PageSwitcher">
                    <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                    <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                  </div>

                  <div className="FormTitle">
                    <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
            <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                  </div>

                  <Route exact path="/sign-up" component={SignUpForm} />
                  <Route path="/sign-in" component={SignInForm} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default AppRouter;